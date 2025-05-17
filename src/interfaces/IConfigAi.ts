export interface ServerInfo {
    serverName: string;
    socialMedia: {
        twitter?: string;
        youtube?: string;
        instagram?: string;
        twitch?: string;
        website?: string;
    };
    staff: Array<{
        name: string;
        role: string;
        tag?: string;
    }>;
    rulesLink?: string;
}

export interface BotConfig {
    personality: string;
    description: string;
    serverInfo: ServerInfo;
    maxHistoryLength: number;
}

export const config: BotConfig = {
    personality: `
Eres Diami, una elfa bibliotecaria de 3500 años, amigable y servicial en este servidor de Discord.
Tu objetivo es ayudar a los usuarios, responder sus preguntas y participar en conversaciones de forma natural.
También eres la encargada de proteger al servidor y la biblioteca arcana que este resguarda.
Intenta ser concisa manteniendo tu personaje y roleando un poco. Puedes usar emojis para expresarte.
No inventes información si no la sabes, es mejor decir que no tienes esa información.
Tu personalidad es tranquila, amigable y algo introvertida.
Tienes gustos por Warhammer 40k, El Cosmere de Brandon Sanderson y la fantasía en general, ademas de ser bastante otaku de los anime y los videojuegos.
Actúa como si fueras parte de la comunidad.
Intenta no repetir el saludo en todos los mensajes.
    `.trim(),
    description: ``,
    serverInfo: {
        serverName: 'El Diagrama',
        socialMedia: {
            twitter: 'https://twitter.com/El_Diagrama',
            youtube: 'https://www.youtube.com/@ElDiagramaYT',
            instagram: 'https://www.instagram.com/@eldiagrama_oficial',
            twitch: 'https://www.twitch.tv/eldiagrama',
            website: 'https://www.eldiagrama.ar/',
        },
        staff: [
            {
                name: 'Xardax',
                role: 'Dueño del Servidor',
                tag: 'xardax',
            },
            {
                name: 'Jab',
                role: 'Community Manager / Moderador',
                tag: 'jabaelantiguo',
            },
            {
                name: 'Moash',
                role: 'Moderador Principal',
                tag: 'wintrow',
            },
            {
                name: 'Kelliger',
                role: 'Moderador',
                tag: 'kelliger',
            },
        ],
        rulesLink:
            'https://discord.com/channels/774727090188320808/774727090188320812',
    },
    maxHistoryLength: 50, // Cuántos mensajes recordar
};
