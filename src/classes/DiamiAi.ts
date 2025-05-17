import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
    GenerationConfig,
} from '@google/generative-ai';
import { Message, heading, TextChannel } from 'discord.js';
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
    model: 'gemini-1.5-flash-latest',
});

// Historial de mensajes

interface ChatMessage {
    author: string; // Nombre de usuario o "IA"
    content: string;
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

    //channel.sendTyping();

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
                .map((msg) => `${msg.author.username}: ${msg.content}`)
                .join('\n');
        } else {
            console.log(
                'Mencionado en un DM o canal no textual, no se cargará historial del canal.'
            );
        }
    } catch (err) {
        console.error('Error al obtener historial de mensajes del canal:', err);
    }

    // Construir el prompt para Gemini con personalidad, info del server e historial

    const fullPrompt = `
${config.personality}
${serverInfoContext}

A continuación, el historial reciente de la conversación (los últimos ${config.maxHistoryLength} mensajes). El mensaje mas reciente es el del usuario actual.
--- HISTORIAL ---
${formattedHistory || 'No hay historial previo disponible para esta conversación.'}
--- FIN DEL HISTORIAL ---

Tu tarea es responder al ultimo mensaje del usuario (${userName}), que es: "${userPrompt}"
Considera el contexto del Historial y la información del servidor proporcionada.
Responde de forma natural como Diami.

Tu respuesta:
    `.trim();

    try {
        const generationConfig: GenerationConfig = {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
        };

        const safetySettings = [
            // Configuración de seguridad (opcional pero recomendada)
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
        ];

        const chat = geminiModel.startChat({
            history: [],
            generationConfig,
            safetySettings,
        });

        const result = await chat.sendMessage(fullPrompt);
        const response = result.response;
        //channel.stopTyping();
        const geminiText = response.text();

        return geminiText;
    } catch (error) {
        console.error(error);
        return 'No entiendo';
    }
}
