import {
    EmbedBuilder,
    Events,
    Guild,
    GuildMember,
    Message,
    TextChannel,
} from 'discord.js';
import axios from 'axios';
import CustomClient from '../../classes/CustomClient';
import Event from '../../classes/Event';
import GuildConfig from '../../schemas/GuildConfig';
import {
    getResponse,
    getResponseBard,
    getResponseGPT,
} from '../../classes/ResponseAi';

export default class ChatDiamiAi extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.MessageCreate,
            description: 'Ai Diami',
            once: false,
        });
    }

    async Execute(message: Message) {
        const { guild } = message;
        const guildConfig = await GuildConfig.findOne({
            guildId: `${message.guildId}`,
        });

        if (!guild) return;
        if (message.author.bot) return;
        if (message.channelId === guildConfig?.channels.confession) return;
        let target = null;
        if (message.mentions.users.first())
            target = message.mentions.users.first()?.id;
        if (
            message.content.startsWith('>>') ||
            target === this.client.user?.id
        ) {
            //const response = await getResponseGPT(message);
            const response = await getResponseBard(message);

            //@ts-ignore
            message.channel.send(response);
            //message.reply(response);
        }
    }
}
