import {
    ApplicationCommandType,
    ContextMenuCommandType,
    EmbedBuilder,
    MessageContextMenuCommandInteraction,
    PermissionsBitField,
    TextChannel,
} from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';
import ContextMenu from '../../classes/ContextMenu';
import { readdirSync } from 'fs';

export default class HeresyContext extends ContextMenu {
    constructor(client: CustomClient) {
        super(client, {
            name: 'Herejía!',
            category: Category.Community,
            type: ApplicationCommandType.Message as ContextMenuCommandType,
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
            'https://cdn.discordapp.com/attachments/1065851123317096528/1094064467232432188/335634361_779115646882725_2629956813360060633_n.jpg',
            'https://cdn.discordapp.com/attachments/1065851123317096528/1094065014937235487/commands2Fheresy2F0719af36815b2cc3fd67e1d136829a4c.png',
            'https://cdn.discordapp.com/attachments/1065851123317096528/1094065077402996746/commands2Fheresy2F23b.png',
            'https://cdn.discordapp.com/attachments/1065851123317096528/1094065298417664061/commands2Fheresy2FENshG9eXkAMQwmn.png',
            'https://cdn.discordapp.com/attachments/1065851123317096528/1094065334283161702/40k-heresy.gif',
            'https://cdn.discordapp.com/attachments/1065851123317096528/1094065404537749664/commands2Fheresy2Falguien-ha-dicho-hereja.png',
            'https://cdn.discordapp.com/attachments/1065851123317096528/1094065442018033725/commands2Fheresy2Faq7AVVM_700bwp.png',
            'https://cdn.discordapp.com/attachments/1065851123317096528/1094065614366187608/cease-your-heresy-warhammer.gif',
            'https://cdn.discordapp.com/attachments/1065851123317096528/1094065658121158736/commands2Fheresy2Fdid-someone-mention-heresy.png',
            'https://cdn.discordapp.com/attachments/1065851123317096528/1094065710185062501/commands2Fheresy2Fimages.png',
            'https://cdn.discordapp.com/attachments/1065851123317096528/1094065816158339072/commands2Fheresy2Fthumb_not-sure-if-joke-orneresy-not-sure-if-joke-or-51712681.png',
        ];
        //const images = readdirSync('./images/heresy/');

        //# Rnd
        const index = Math.trunc(Math.random() * image.length);

        await message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('DarkRed')
                    .setThumbnail(
                        'https://media.discordapp.net/attachments/1065851123317096528/1094065762676785213/commands2Fheresy2Flogo.png' +
                            apiKey
                    )
                    .setDescription(
                        `${user}, lo que has dicho es una gran herejía!`
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
                    .setTitle('Herejía!'),
            ],
            //content: `${user}`,
            //fetchReply: true,
            allowedMentions: { users: [user?.id], repliedUser: true },
        });
        int.reply('Enviado...');
        int.deleteReply();
    }
}
