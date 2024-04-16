import {
    ChatInputCommandInteraction,
    CacheType,
    TextChannel,
    EmbedBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    ModalBuilder,
    ModalActionRowComponentBuilder,
} from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import SubCommand from '../../classes/SubCommand';
import WelcomeConfig from '../../schemas/WelcomeConfig';

export default class ConfigWelcomeMessage extends SubCommand {
    constructor(client: CustomClient) {
        super(client, {
            name: 'config-welcome.message',
        });
    }
    async Execute(int: ChatInputCommandInteraction) {
        let welcome = await WelcomeConfig.findOne({
            guildId: `${int.guildId}`,
        });
        if (!welcome)
            welcome = await WelcomeConfig.create({ guildId: int.guildId });

        await welcome.save();

        let message = welcome.message;
        const defaultMessage =
            'Bienvenid@ <{USERID}> soy Diami, la bibliotecaria del Diagrama, y la encargada de darte la bienvenida!\n- No olvides pasar por <id:customize> para configurar el server a tu gusto.\n- Tampoco olvides visitar las <#774727090188320812> del server.';

        const modal = new ModalBuilder()
            .setCustomId('config_welcome-modal')
            .setTitle(`Mensaje de Bienvenida`);

        const actionRow =
            new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                new TextInputBuilder()
                    .setCustomId('welcomeMessage')
                    .setLabel('Mensaje:')
                    .setRequired(true)
                    .setStyle(TextInputStyle.Paragraph)
                    .setValue(message ? message : defaultMessage)
            );

        modal.addComponents(actionRow);
        int.showModal(modal);
    }
}
