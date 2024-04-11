import {
    ApplicationCommandType,
    EmbedBuilder,
    MessageContextMenuCommandInteraction,
    PermissionsBitField,
    TextChannel,
} from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';
import ContextMenu from '../../classes/ContextMenu';
import GuildConfig from '../../schemas/GuildConfig';
import { readdirSync } from 'fs';

export default class DerrapeContext extends ContextMenu {
    constructor(client: CustomClient) {
        super(client, {
            name: 'Derrape',
            category: Category.Community,
            type: ApplicationCommandType.Message,
            default_member_permissions:
                PermissionsBitField.Flags.UseApplicationCommands,
            dev: false,
        });
    }

    async Execute(int: MessageContextMenuCommandInteraction) {
        const message = int.targetMessage;
        const user = int.targetMessage.author;
        if (!user) return;
        //@ Image load
        const apiKey =
            '?ex=66231524&is=6610a024&hm=595a98c3fa5f8561bd518b8628c09c3ce1c4acbc38a08b451f375a991a949fb5&=&format=webp&quality=lossless';

        const image = [
            'https://media.discordapp.net/attachments/1065851123317096528/1065859327874834473/Multiplayer.gif',
        ];
        //const images = readdirSync('./images/heresy/');

        //# Rnd
        const index = Math.trunc(Math.random() * image.length);

        await message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('DarkRed')
                    .setDescription(
                        `Mira ese derrape. papa! Ya podes competir con Fairon.`
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
            //content: `${user}`,
            //fetchReply: true,
            //allowedMentions: { users: [user?.id], repliedUser: true },
        });
        int.reply('Enviado...');
        int.deleteReply();
    }
}
