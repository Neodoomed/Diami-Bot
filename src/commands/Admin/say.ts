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

export default class SayBack extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'say-back',
            description: '🗨️ Puedes enviar un mensaje como si fueras Diami',
            category: Category.Administration,
            default_member_permissions: PermissionsBitField.Flags.Administrator,
            dm_permissions: false,
            cooldown: 10,
            dev: false,
            options: [
                {
                    name: 'text',
                    description: 'Mensaje',
                    type: ApplicationCommandOptionType.String,
                    require: true,
                },
            ],
        });
    }

    async Execute(int: ChatInputCommandInteraction) {
        const text = int.options.getString('text');

        //@ts-ignore
        int.channel.send({ content: text });

        await int
            .reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Random')
                        .setDescription(`Mensaje enviado.`),
                ],
                ephemeral: true,
            })
            .then(async () => {
                await int.deleteReply();
            });

        return;
    }
}
