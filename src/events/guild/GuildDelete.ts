import { Events, Guild } from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Event from '../../classes/Event';
import GuildConfig from '../../schemas/GuildConfig';

export default class GuildDelete extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.GuildDelete,
            description: 'Guild leave',
            once: false,
        });
    }

    async Execute(guild: Guild) {
        try {
            await GuildConfig.deleteOne({ guildId: guild.id });
        } catch (e) {
            this.client.logger.mongo(`Error eliminando Guild.`);
            this.client.logger.mongo(`${e}`);
        }
    }
}
