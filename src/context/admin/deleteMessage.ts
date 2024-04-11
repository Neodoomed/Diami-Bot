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

export default class DeleteMessageContext extends ContextMenu {
    constructor(client: CustomClient) {
        super(client, {
            name: 'Borrar Mensaje',
            category: Category.Administration,
            type: ApplicationCommandType.Message,
            default_member_permissions: PermissionsBitField.Flags.KickMembers,
            dev: false,
        });
    }

    async Execute(int: MessageContextMenuCommandInteraction) {
        await int.targetMessage.delete();

        const msg = await int.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription(`🆑 Mensaje borrado.`),
            ],
            ephemeral: true,
        });
        await setTimeout(() => {
            msg.delete();
        }, 10000);

        const guild = await GuildConfig.findOne({
            guildId: `${int.guildId}`,
        });

        if (guild && guild?.logs?.moderation?.enabled) {
            const channelLog = (await int.guild?.channels.fetch(
                guild?.logs.moderation.channelId
            )) as TextChannel;
            channelLog?.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blue')
                        .setThumbnail(
                            'https://media.discordapp.net/attachments/1227001009574772777/1227725136770105445/moderation-icon.png?ex=66297322&is=6616fe22&hm=075e09cde1380d813217bc2058cf51363ef492d4e9be8ac3fb9a24fb6a1f25f9&=&format=webp&quality=lossless'
                        )
                        .setTitle(`🔷 Moderación `)
                        .setDescription(
                            `🆑 El mod ${int.user} borro un mensaje`
                        )
                        .addFields({
                            name: `Mensaje:`,
                            value: `${int.targetMessage.content}`,
                        })
                        .addFields({
                            name: `Autor:`,
                            value: `${int.targetMessage.author}`,
                        })
                        .setTimestamp()
                        .setFooter({
                            text:
                                `El Emperador Protege.` +
                                `\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t`,
                        }),
                ],
            });
        }
    }
}
