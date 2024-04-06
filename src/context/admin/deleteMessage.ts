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

        int.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription(`🆑 Mensaje borrado.`),
            ],
            ephemeral: true,
        });

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
                        //.setThumbnail(target.displayAvatarURL())
                        .setAuthor({ name: `🆑 Mensaje Borrado` })
                        .setDescription(
                            `**Mensaje:**\n ${int.targetMessage.content} \n**Escrito por:** ${int.targetMessage.author}`
                        )
                        .setTimestamp()
                        .setFooter({
                            text: `Realizado por ${int.user.displayName} | ${int.user.id}\t\tEl Emperador Protege.`,
                        }),
                ],
            });
        }
    }
}
