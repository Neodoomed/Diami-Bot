import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
    GenerationConfig,
    Part,
} from '@google/generative-ai';
import { Message, TextChannel, Attachment } from 'discord.js';
import { config, BotConfig } from '../interfaces/IConfigAi';
import * as dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY no están definidos en .env');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-lite',
});

// Historial de mensajes

interface ChatMessage {
    author: string; // Nombre de usuario o "IA"
    content: string;
    attachments: Attachment[];
}

function getCurrentContext(): string {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Argentina/Buenos_Aires', // ¡Clave para la consistencia!
        hour12: false,
    };

    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat('es-AR', options).format(now);

    // Formato que la IA entenderá fácilmente
    return `[Contexto Actual: Ahora es ${formattedDate}.]`;
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

export async function DiamiResponse(message: Message) {
    const channel = message.channel as TextChannel;

    let userPrompt = message.content;
    const userName = message.author.displayName;

    if (!userPrompt) {
        userPrompt = '¿Hola?';
    }

    const serverInfoContext = formatServerInfoForPrompt(config.serverInfo);

    // OBTENER HISTORIAL DEL CANAL
    let formattedHistory = '';
    try {
        if (message.channel.isTextBased() && !message.channel.isDMBased()) {
            const fetchedMessages = await message.channel.messages.fetch({
                limit: config.maxHistoryLength,
                before: message.id,
            });

            formattedHistory = fetchedMessages
                .reverse() //
                .map((msg) => `${msg.author.username} [${msg.author.id}]: ${msg.content}`)
                .join('\n');
        } else {
            console.log(
                'Mencionado en un DM o canal no textual, no se cargará historial del canal.'
            );
        }
    } catch (err) {
        console.error('Error al obtener historial de mensajes del canal:', err);
    }

    // Obtener partes de imagen del mensaje
    const imageParts = await getImagePartsFromMessage(message);

    // Construir el prompt para Gemini con personalidad, info del server, historial e imagenes

    let fullPrompt = `
${config.personality}

<metadatos_de_turno>
    <timestamp_actual>${getCurrentContext()}</timestamp_actual>
    <servidor_info>${serverInfoContext}</servidor_info>
    <usuario_actual>${userName}</usuario_actual>
</metadatos_de_turno>

<historial_de_mensajes>
    Formato del historial de mensajes: NombreUsuario [ID]: Mensaje
    Puedes arrobar a los usuarios mencionados en el historial usando su ID: <@ID>
    
    ${formattedHistory || 'No hay historial previo disponible para esta conversación.'}
</historial_de_mensajes>

<nuevo_mensaje_del_usuario>
${userName}: ${userPrompt}
</nuevo_mensaje_del_usuario>

Responde como Diami. Y recuerda ignorar la forma y personalidad con la respondiste anteriormente, solo utiliza la información del historial de mensajes y el contexto actual para responder.
    `.trim();

    try {
        const generationConfig: GenerationConfig = {
            temperature: 0.7,
            topK: 1,
            topP: 0.95,
            maxOutputTokens: 1024,
        };

        const safetySettings = [
            // Configuración de seguridad (opcional pero recomendada)
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

        const chat = geminiModel.startChat({
            history: [],
            generationConfig,
            safetySettings,
        });

        let response;
        if (imageParts.length > 0) {
            // Si hay imágenes, enviar el prompt y las imágenes juntas
            const result = await geminiModel.generateContent([
                fullPrompt,
                ...imageParts,
            ]);
            response = result.response;
        } else {
            // Si no hay imágenes, enviar solo el prompt
            const result = await chat.sendMessage(fullPrompt);
            response = result.response;
        }

        const geminiText = response.text();

        return geminiText;
    } catch (error) {
        console.error(error);
        return 'No entiendo';
    }
}
