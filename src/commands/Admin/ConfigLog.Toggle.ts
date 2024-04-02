import {
    ChatInputCommandInteraction,
    CacheType,
    TextChannel,
    EmbedBuilder,
} from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import SubCommand from '../../classes/SubCommand';
import GuildConfig from '../../schemas/GuildConfig';

export default class ConfigLogToggle extends SubCommand {
    constructor(client: CustomClient) {
        super(client, {
            name: 'config-log.toggle',
        });
    }
    async Execute(int: ChatInputCommandInteraction) {
        const logType = int.options.getString('log-type');
        const enabled = int.options.getBoolean('toggle');

        await int.deferReply({ ephemeral: true });

        try {
            let guild = await GuildConfig.findOne({
                guildId: `${int.guildId}`,
            });

            if (!guild)
                guild = await GuildConfig.create({ guildId: int.guildId });

            //@ts-ignore
            guild.logs[`${logType}`].enabled = enabled;

            await guild.save();

            int.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Green')
                        .setDescription(
                            `🟩 Actualizado log \`${logType}\`: ${enabled ? 'Enabled' : 'Disabled'}.`
                        ),
                ],
            });

            //return;
        } catch (e) {
            this.client.logger.error(`${e}`);
            int.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setDescription(
                            `🟥 Error al actualizar la base de datos.\n\`${e}\`.`
                        ),
                ],
            });
            //return;
        }
    }
}
