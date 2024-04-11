import { EmbedBuilder, Events, Guild, Message } from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Event from '../../classes/Event';
import GuildConfig from '../../schemas/GuildConfig';

export default class GuildDelete extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.MessageCreate,
            description: 'Sugerencias',
            once: false,
        });
    }

    async Execute(message: Message) {
        const guild = await GuildConfig.findOne({
            guildId: `${message.guildId}`,
        });

        if (!guild?.channels.suggestion) return;
        if (message.channelId === guild?.channels.suggestion) {
            if (message.content.toLowerCase().includes('sugerencia')) {
                message.react('👍');
                message.react('👎');
                message.startThread({
                    name: `Sugerencia de ${message.author.displayName}-${message.createdTimestamp}`,
                    autoArchiveDuration: 60,
                });
                return;
            } else if (message.content.toLowerCase().includes('reclamo')) {
                message.startThread({
                    name: `Reclamo de ${message.author.displayName}-${message.createdTimestamp}`,
                    autoArchiveDuration: 60,
                });
            } else {
                message.delete();
            }
        }
        return;
    }
}
