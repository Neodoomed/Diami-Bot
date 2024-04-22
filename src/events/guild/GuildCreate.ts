import { EmbedBuilder, Events, Guild } from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Event from '../../classes/Event';
import GuildConfig from '../../schemas/GuildConfig';

export default class GuildDelete extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.GuildCreate,
            description: 'Guild leave',
            once: false,
        });
    }

    async Execute(guild: Guild) {
        try {
            if (!(await GuildConfig.exists({ guildId: guild.id })))
                await GuildConfig.create({ guildId: guild.id });
        } catch (e) {
            this.client.logger.mongo(`Error Creando Guild.`);
            this.client.logger.mongo(`${e}`);
        }

        const owner = await guild.fetchOwner();
        owner
            ?.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Purple')
                        .setDescription(
                            `Gracias por invitarme a tu server.\nNo olvides revisar las configuraciones del bot para habilitar todo su poder.`
                        ),
                ],
            })
            .catch();
    }
}
