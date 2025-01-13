import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    PermissionsBitField,
    ActionRowBuilder,
    TextInputBuilder,
    ModalBuilder,
    ModalActionRowComponentBuilder,
    TextInputStyle,
} from 'discord.js';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';

export default class Say extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'say',
            description: '🗨️ Puedes enviar un modal como si fueras Diami',
            category: Category.Administration,
            default_member_permissions: PermissionsBitField.Flags.Administrator,
            dm_permissions: false,
            cooldown: 10,
            dev: false,
            options: [],
        });
    }

    async Execute(int: ChatInputCommandInteraction) {
        //const text = int.options.getString('text');

        //@ts-ignore
        //int.channel.send({ content: text });

        //await int
        //    .reply({
        //        embeds: [
        //            new EmbedBuilder()
        //                .setColor('Random')
        //                .setDescription(`Mensaje enviado.`),
        //        ],
        //        ephemeral: true,
        //    })
        //    .then(async () => {
        //        await int.deleteReply();
        //    });

        const modal = new ModalBuilder()
            .setCustomId('say-modal')
            //.setCustomId(`say-modal${int.user.id}`)
            .setTitle('Enviar confesión');

        const contentInput = new TextInputBuilder()
            .setCustomId('message')
            .setLabel('Mensaje')
            .setRequired(true)
            .setPlaceholder('Escribe el mensaje que Diami dirá.')
            .setStyle(TextInputStyle.Paragraph);

        const secondRow =
            new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                contentInput
            );
        modal.addComponents(secondRow);

        int.showModal(modal);

        return;
    }
}
