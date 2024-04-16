import {
    ChatInputCommandInteraction,
    CacheType,
    TextChannel,
    EmbedBuilder,
} from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import SubCommand from '../../classes/SubCommand';
import WelcomeConfig from '../../schemas/WelcomeConfig';

export default class ConfigWelcomeSet extends SubCommand {
    constructor(client: CustomClient) {
        super(client, {
            name: 'config-welcome.set',
        });
    }
    async Execute(int: ChatInputCommandInteraction) {
        const channel = int.options.getChannel('channel') as TextChannel;

        await int.deferReply({ ephemeral: true });

        try {
            let welcome = await WelcomeConfig.findOne({
                guildId: `${int.guildId}`,
            });

            if (!welcome)
                welcome = await WelcomeConfig.create({ guildId: int.guildId });

            //@ts-ignore
            welcome.channelId = channel.id;

            await welcome.save();

            int.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Green')
                        .setDescription(
                            `🟩 Actualizado Saludo en el canal ${channel}.`
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
