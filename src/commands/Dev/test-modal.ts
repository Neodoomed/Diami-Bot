import {
    ActionRowBuilder,
    ChatInputCommandInteraction,
    ModalActionRowComponentBuilder,
    ModalBuilder,
    PermissionsBitField,
    TextInputBuilder,
    TextInputStyle,
} from 'discord.js';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';

export default class TestModal extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'test-modal',
            description: 'Test de modal',
            category: Category.Administration,
            default_member_permissions: PermissionsBitField.Flags.Administrator,
            dm_permissions: false,
            cooldown: 10,
            dev: true,
            options: [],
        });
    }

    async Execute(int: ChatInputCommandInteraction) {
        const modal = new ModalBuilder()
            .setCustomId('test-modal')
            .setTitle('Modal Test');

        const firstRow =
            new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                new TextInputBuilder()
                    .setCustomId('test')
                    .setLabel('Titulo')
                    .setRequired(true)
                    .setStyle(TextInputStyle.Short)
            );

        modal.addComponents(firstRow);

        int.showModal(modal);
    }
}
