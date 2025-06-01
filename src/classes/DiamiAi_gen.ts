import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
    GenerationConfig,
    Part,
    GenerativeModel,
    Content,
} from '@google/generative-ai';
import { Message, TextChannel, Attachment, EmbedBuilder } from 'discord.js';
import { config, BotConfig } from '../interfaces/IConfigAi';
import * as dotenv from 'dotenv';
import { readFile } from 'fs/promises';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY no están definidos en .env');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
let geminiModel: GenerativeModel;

// Initialize geminiModel outside the function for reuse
async function initializeGeminiModel() {
    if (!geminiModel) {
        geminiModel = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash-lite',
        });
    }
}
// Historial de mensajes

interface ChatMessage {
    author: string; // Nombre de usuario o "IA"
    content: string;
    attachments: Attachment[]; // Store attachments
}

function formatServerInfoForPrompt(
    serverInfo: BotConfig['serverInfo']
): string {
    let infoString = 'Información relevante sobre el servidor:\n';
    infoString += `- Nombre del Servidor: ${serverInfo.serverName}\n`;

    if (
        serverInfo.socialMedia &&
        Object.keys(serverInfo.socialMedia).length > 0
    ) {
        infoString += '- Redes Sociales:\n';
        for (const [platform, link] of Object.entries(serverInfo.socialMedia)) {
            if (link)
                infoString += `  - ${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${link}\n`;
        }
    }

    if (serverInfo.staff && serverInfo.staff.length > 0) {
        infoString += '- Miembros del Staff:\n';
        serverInfo.staff.forEach((member) => {
            infoString += `  - ${member.name} (${member.role})${member.tag ? ` (Discord: ${member.tag})` : ''}\n`;
        });
    }

    if (serverInfo.rulesLink) {
        infoString += `- Enlace a las reglas del servidor: ${serverInfo.rulesLink}\n`;
    }
    return infoString;
}

async function getImagePartsFromMessage(message: Message): Promise<Part[]> {
    const imageParts: Part[] = [];
    if (message.attachments.size > 0) {
        for (const attachment of message.attachments.values()) {
            if (attachment.contentType?.startsWith('image/')) {
                try {
                    const response = await fetch(attachment.url);
                    const buffer = await response.arrayBuffer();
                    const uint8Array = new Uint8Array(buffer);
                    imageParts.push({
                        inlineData: {
                            mimeType: attachment.contentType,
                            data: Buffer.from(uint8Array).toString('base64'),
                        },
                    });
                } catch (error) {
                    console.error('Error fetching or processing image:', error);
                    // Handle the error, maybe log it or inform the user
                }
            }
        }
    }
    return imageParts;
}

export async function DiamiResponse(message: Message) {
    await initializeGeminiModel();
    const channel = message.channel as TextChannel;

    let userPrompt = message.content;
    const userName = message.author.displayName;

    if (!userPrompt) {
        userPrompt = '¿Hola?';
    }

    const serverInfoContext = formatServerInfoForPrompt(config.serverInfo);

    // GET IMAGES
    const imageParts = await getImagePartsFromMessage(message);

    // OBTENER HISTORIAL DEL CANAL
    let formattedHistory: ChatMessage[] = []; // Changed type to ChatMessage[]
    try {
        if (message.channel.isTextBased() && !message.channel.isDMBased()) {
            const fetchedMessages = await message.channel.messages.fetch({
                limit: config.maxHistoryLength,
                before: message.id,
            });

            formattedHistory = fetchedMessages.reverse().map((msg) => ({
                author: msg.author.username,
                content: msg.content,
                attachments: Array.from(msg.attachments.values()), // Store attachments
            }));
        } else {
            console.log(
                'Mencionado en un DM o canal no textual, no se cargará historial del canal.'
            );
        }
    } catch (err) {
        console.error('Error al obtener historial de mensajes del canal:', err);
    }

    // Build the prompt for Gemini with personality, server info, and history
    const historyForGemini: Content[] = [];

    // Add server info
    historyForGemini.push({
        role: 'user',
        parts: [{ text: `Información del servidor:\n${serverInfoContext}` }],
    });

    // Add personality (moved from fullPrompt)
    historyForGemini.push({
        role: 'user',
        parts: [{ text: config.personality }],
    });

    // Add history
    for (const msg of formattedHistory) {
        const parts: Part[] = [{ text: msg.content }];
        const imagePartsFromHistory = await getImagePartsFromMessage({
            attachments: {
                size: msg.attachments.length,
                values: () => msg.attachments.values(),
            } as any,
        } as Message); // Create a dummy message object for attachments
        parts.push(...imagePartsFromHistory);

        historyForGemini.push({
            role: msg.author === userName ? 'user' : 'assistant',
            parts,
        });
    }

    // Add user's current message
    const userParts: Part[] = [{ text: userPrompt }, ...imageParts];
    historyForGemini.push({
        role: message.author.username,
        parts: userParts,
    });

    try {
        const generationConfig: GenerationConfig = {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024, // Reduced this to make it faster.
        };

        let safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
        ];

        const result = await geminiModel.generateContent({
            contents: historyForGemini,
            generationConfig,
            safetySettings,
        });
        let geminiText = result.response.text();

        // Check if the user requested an image

        return geminiText;
    } catch (error) {
        console.error(error);
        return 'No entiendo';
    }
}

async function generateImage(
    prompt: string,
    generationConfig: GenerationConfig,
    safetySettings: any
) {
    await initializeGeminiModel();

    try {
        const result = await geminiModel.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig,
            safetySettings,
        });

        const response = result.response;
        //@ts-ignore
        const image = response.candidates[0].content.parts[0].fileData.data; // Assuming the first candidate is the image
        return image;
    } catch (error) {
        console.error('Error generating image:', error);
        return null; // Indicate failure
    }
}
