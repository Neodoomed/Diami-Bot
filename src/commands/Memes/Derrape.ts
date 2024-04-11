import {
    ActionRowBuilder,
    ApplicationCommandOptionType,
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

export default class Derrape extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'derrape',
            description:
                '🚘 Acabas de presenciar un derrape digno de ser recordado.',
            category: Category.Community,
            default_member_permissions:
                PermissionsBitField.Flags.UseApplicationCommands,
            dm_permissions: false,
            cooldown: 10,
            dev: false,
            options: [
                {
                    name: 'user',
                    description:
                        'Usuario objetivo. (Si no lo especificas no mencionara a nadie)',
                    type: ApplicationCommandOptionType.User,
                    require: false,
                },
            ],
        });
    }

    async Execute(int: ChatInputCommandInteraction) {
        const user = await int.options.getUser('user')?.fetch();

        //@ Image load
        const apiKey =
            '?ex=66231524&is=6610a024&hm=595a98c3fa5f8561bd518b8628c09c3ce1c4acbc38a08b451f375a991a949fb5&=&format=webp&quality=lossless';

        const image = [
            'https://media.discordapp.net/attachments/1065851123317096528/1065859327874834473/Multiplayer.gif',
        ];
        //const images = readdirSync('./images/heresy/');

        //# Rnd
        const index = Math.trunc(Math.random() * image.length);

        await int.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('DarkRed')
                    .setDescription(
                        `Mira ese derrape, papa! Ya podes competir con Fairon.`
                    )
                    .setImage(image[index] + apiKey)
                    .setFooter({
                        text:
                            `Enviado por ${int.user.displayName} · El Emperador Protege.` +
                            `\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t`,
                        iconURL: int.user.displayAvatarURL({
                            extension: 'png',
                        }),
                    })
                    .setTitle('Derrapaste!'),
            ],
            content: `${user ? user : ''}`,
            fetchReply: true,
            allowedMentions: {
                users: [user ? user.id : int.user.id],
                repliedUser: true,
            },
        });
    }
}
