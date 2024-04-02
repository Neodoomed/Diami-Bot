import {
    ChatInputCommandInteraction,
    CacheType,
    TextChannel,
    EmbedBuilder,
} from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import SubCommand from '../../classes/SubCommand';
import GuildConfig from '../../schemas/GuildConfig';

export default class ConfigLogSet extends SubCommand {
    constructor(client: CustomClient) {
        super(client, {
            name: 'config-log.set',
        });
    }
    async Execute(int: ChatInputCommandInteraction) {
        const logType = int.options.getString('log-type');
        const channel = int.options.getChannel('channel') as TextChannel;

        await int.deferReply({ ephemeral: true });

        try {
            let guild = await GuildConfig.findOne({
                guildId: `${int.guildId}`,
            });

            if (!guild)
                guild = await GuildConfig.create({ guildId: int.guildId });

            //@ts-ignore
            guild.logs[`${logType}`].channelId = channel.id;

            await guild.save();

            int.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Green')
                        .setDescription(
                            `🟩 Actualizado log \`${logType}\` en el canal ${channel}.`
                        ),
                ],
            });

            return;
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
            return;
        }
    }
}
