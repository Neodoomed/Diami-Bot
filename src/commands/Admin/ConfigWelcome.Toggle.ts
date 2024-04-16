import {
    ChatInputCommandInteraction,
    CacheType,
    TextChannel,
    EmbedBuilder,
} from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import SubCommand from '../../classes/SubCommand';
import WelcomeConfig from '../../schemas/WelcomeConfig';

export default class ConfigWelcomeToggle extends SubCommand {
    constructor(client: CustomClient) {
        super(client, {
            name: 'config-welcome.toggle',
        });
    }
    async Execute(int: ChatInputCommandInteraction) {
        const enabled = int.options.getBoolean('toggle');

        await int.deferReply({ ephemeral: true });

        try {
            let welcome = await WelcomeConfig.findOne({
                guildId: `${int.guildId}`,
            });

            if (!welcome)
                welcome = await WelcomeConfig.create({ guildId: int.guildId });

            //@ts-ignore
            welcome.enabled = enabled;
            await welcome.save();

            int.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Green')
                        .setDescription(
                            `🟩 Actualizado Bienvenida: ${enabled ? 'Enabled' : 'Disabled'}.`
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
        return;
    }
}
