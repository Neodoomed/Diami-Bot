import {
    EmbedBuilder,
    Events,
    Guild,
    GuildMember,
    Message,
    TextChannel,
} from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Event from '../../classes/Event';
import GuildConfig from '../../schemas/GuildConfig';
import { DiamiResponse } from '../../classes/DiamiAi';

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
        const channel = message.channel as TextChannel;

        const guildConfig = await GuildConfig.findOne({
            guildId: `${message.guildId}`,
        });

        let response = null;

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
            channel.sendTyping();
            response = await DiamiResponse(message);
            channel.send(response);
        }
    }
}
