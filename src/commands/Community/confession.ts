import {
    ActionRowBuilder,
    ChatInputCommandInteraction,
    EmbedBuilder,
    ModalActionRowComponentBuilder,
    ModalBuilder,
    PermissionsBitField,
    TextInputBuilder,
    TextInputStyle,
} from 'discord.js';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';
import path = require('path');

export default class Confession extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'confesión',
            description:
                '🗨️ Puedes realizar una confesión o pregunta totalmente anónima.',
            category: Category.Community,
            default_member_permissions:
                PermissionsBitField.Flags.UseApplicationCommands,
            dm_permissions: false,
            cooldown: 10,
            dev: false,
            options: [],
        });
    }

    async Execute(int: ChatInputCommandInteraction) {
        const modal = new ModalBuilder()
            .setCustomId('confession-modal')
            .setTitle('Enviar confesión');

        const contentInput = new TextInputBuilder()
            .setCustomId('message')
            .setLabel('Confesión')
            .setRequired(true)
            .setPlaceholder('Escribe tu confesión.')
            .setStyle(TextInputStyle.Paragraph);

        const secondRow =
            new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                contentInput
            );
        modal.addComponents(secondRow);

        int.showModal(modal);
    }
}
