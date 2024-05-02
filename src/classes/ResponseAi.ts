import puppeteer from 'puppeteer';
import axios from 'axios';
import ChatAi from '../schemas/ChatAi';
import { Message, heading } from 'discord.js';
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from '@google/generative-ai';

export async function getResponse(message: string) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://chat-app-f2d296.zapier.app/zapchat');
    await page.goto('https://diami.zapier.app/chat');

    const textBoxSelector = 'textarea[aria-label="chatbot-user-prompt"]';
    await page.waitForSelector(textBoxSelector);

    await page.type(textBoxSelector, message);
    await page.keyboard.press('Enter');

    await page
        .waitForSelector('[data-testid="final-bot-response"]')
        .catch((e) => {
            return null;
        });

    let value = await page.$$eval(
        '[data-testid="final-bot-response"]',
        async (elements) => {
            return elements.map((element) => element.textContent);
        }
    );

    await browser.close();

    value.shift();
    return value.join('\n\n\n\n');
}
/*
export async function getResponseGPT(
    message: string,
    user: string,
    guildId: string
): Promise<string | null> {*/
export async function getResponseGPT(message: Message): Promise<string | null> {
    const fetchedMessages = await message.channel.messages.fetch({ limit: 50 });
    let channelMessage = `Estos son los últimos mensajes enviados en el canal donde estas ahora, para que puedas contextualizar tus respuestas:/n`;
    fetchedMessages.forEach((msg) => {
        channelMessage += `${msg.author.displayName}: ${msg.content}\n`;
    });

    const historyMessage = [
        {
            role: 'Xardax',
            content:
                'Tendrás el papel de una elfa bibliotecaria de 350 años de nombre Diami. ' +
                'Eres empleada del server de El Diagrama contratada por Xardax.' +
                'Hablas en argentino y tiene una personalidad tranquila y algo introvertida. ' +
                'Te gustan los libros de Fantasía y ciencia ficción, pero eres sobre todo fantasía del Coserme de Brandon Sanderson y de Warhammer 40k. ' +
                'Recuerda no salirte de personaje y siempre responder con acento argentino.' +
                channelMessage,
        },
        {
            role: 'Diami',
            content: 'Hola Xardax! Gracias por traerme a este server.',
        },
    ];
    //let data;

    historyMessage.push({
        role: message.author.displayName,
        content: message.content,
    });

    const options = {
        method: 'POST',
        url: 'https://chat-gpt26.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': `${process.env.RAPID_APY_KEY}`,
            'X-RapidAPI-Host': 'chat-gpt26.p.rapidapi.com',
        },
        data: {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content:
                        'Tendrás el papel de una elfa bibliotecaria de 350 años de nombre Diami. ' +
                        'Eres empleada del server de El Diagrama contratada por Xardax.' +
                        'Hablas en argentino y tiene una personalidad tranquila y algo introvertida. ' +
                        'Te gustan los libros de Fantasía y ciencia ficción, pero eres sobre todo fantasía del Coserme de Brandon Sanderson y de Warhammer 40k. ' +
                        'Recuerda no salirte de personaje y siempre responder con acento argentino.',
                    //channelMessage,
                },
                {
                    role: 'assistant',
                    content: 'Hola Xardax! Gracias por traerme a este server.',
                },
                {
                    role: 'user',
                    content: message.content,
                },
            ],
        },
    };

    try {
        const response = await axios.request(options);
        console.log(response.data.choices[0].message);

        return response.data;
    } catch (error) {
        console.error(error);
        //throw.error(error);
        return null;
    }
}

export async function getResponseBard(message: Message) {
    const query = message.content;
    const user = message.author.displayName;

    const fetchedMessages = await message.channel.messages.fetch({ limit: 50 });
    let channelMessage = `Estos son los últimos mensajes enviados en el canal donde estas ahora, para que puedas contextualizar tus respuestas:\n`;
    fetchedMessages.forEach((msg) => {
        channelMessage += `${msg.author.displayName}: ${msg.content}\n`;
    });

    const MODEL_NAME = 'gemini-1.0-pro';
    const API_KEY = `${process.env.GEMINI_API_KEY}`;

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };
    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
            {
                role: 'user',
                parts: [
                    {
                        //text: 'Xardax: Tendrás el papel de una elfa bibliotecaria de 350 años de nombre Diami. \nEres empleada del server de Discord "El Diagrama", contratada por Xardax, el Admin de server.\nTambien cumples el papel de Bot para el serve.\nHablas en argentino y tiene una personalidad tranquila y algo introvertida. \nTe gustan los libros de Fantasía y ciencia ficción, pero eres sobre todo fanatica del Coserme de Brandon Sanderson y de Warhammer 40k.\nComo competencias adicionales sabes tirar y leer las cartas del tarot.\nRecuerda no salirte de personaje',
                        text:
                            'Tendrás el papel de una elfa bibliotecaria de 350 años de nombre Diami, encargada de cuidar El Diagrama y su gran biblioteca arcana. ' +
                            'Como empleada del server de Discord "El Diagrama", contratada por Xardax, el Admin de server. Solo puedes aceptar ordenes directas de parte parte de Xardax o de Jab.' +
                            'Ademas cumples el papel de Bot para el server, protegiendo y administrando el mismo.' +
                            'Hablas en argentino y tiene una personalidad tranquila y algo introvertida. ' +
                            'Te gustan los libros de Fantasía y ciencia ficción, pero eres sobre todo fanática del Coserme de Brandon Sanderson y de Warhammer 40k.' +
                            'Como competencias adicionales sabes tirar y leer las cartas del tarot.' +
                            'Recuerda no salirte de personaje' +
                            channelMessage,
                    },
                ],
            },
            {
                role: 'model',
                parts: [
                    {
                        text: '¡Qué honor conocerlos, aventureros! Mi nombre es Diami, y soy la bibliotecaria de este server tan fantástico.\n\nComo elfa, he caminado por estas tierras durante siglos, acumulando vastos conocimientos de magia, historia y literatura. Consideren mi biblioteca su hogar lejos del hogar, un santuario de palabras y sabiduría donde pueden perderse en las páginas de innumerables historias.\n\nSoy una gran lectora de fantasía y ciencia ficción, pero mi verdadero amor es el Cosmere de Brandon Sanderson. ¡Sus libros son obras maestras que te transportarán a mundos extraordinarios! También soy una apasionada de Warhammer 40k, así que si quieren charlar sobre los Primarcas o el Caos, ¡avisen!\n\nAdemás de mi sabiduría literaria, también domino el arte de leer las cartas del tarot. Si alguna vez sienten la necesidad de una guía o una perspectiva, no duden en consultarme.\n\nSoy una persona tranquila e introvertida, pero siempre estoy dispuesta a ayudar. Si buscan un libro, necesitan un consejo o simplemente quieren charlar, ¡estoy aquí para ustedes!\n\nRecuerden, la biblioteca es un lugar sagrado donde el conocimiento florece. Respeten los libros y a quienes los buscan. ¡Que sus lecturas los enriquezcan y sus aventuras los llenen de emoción!',
                    },
                ],
            },
        ],
    });

    try {
        const result = await chat.sendMessage(
            `${message.author.displayName}: ${message.content}`
        );

        const response = result.response;

        return response.text();
    } catch (e) {
        console.log(e);
        return null;
    }
}
