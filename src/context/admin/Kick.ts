import {
    ActionRowBuilder,
    ApplicationCommandType,
    EmbedBuilder,
    ModalBuilder,
    PermissionsBitField,
    TextChannel,
    TextInputBuilder,
    TextInputStyle,
    UserContextMenuCommandInteraction,
} from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';
import ContextMenu from '../../classes/ContextMenu';
import GuildConfig from '../../schemas/GuildConfig';

export default class KickContext extends ContextMenu {
    constructor(client: CustomClient) {
        super(client, {
            name: 'Patada',
            category: Category.Administration,
            type: ApplicationCommandType.User,
            default_member_permissions: PermissionsBitField.Flags.KickMembers,
            dev: false,
        });
    }

    async Execute(int: UserContextMenuCommandInteraction) {
        const target = int.targetUser;
        let reason = `Músico-testiculares (Por que a ${int.user.displayName} le cantaron las pelotas.)`;

        const errorEmbed = new EmbedBuilder().setColor('Red');

        const kickReason = new TextInputBuilder({
            customId: 'kickReason',
            label: 'Por que lo vamos a patear?',
            style: TextInputStyle.Paragraph,
            placeholder: `Músico-testiculares (Por que a ${int.user.displayName} le cantaron las pelotas.)`,
            value: `Músico-testiculares (Por que a ${int.user.displayName} le cantaron las pelotas.)`,
        });
        const actionRow =
            new ActionRowBuilder<TextInputBuilder>().addComponents(kickReason);

        const modal = new ModalBuilder({
            customId: `kick-${int.user.id}`,
            title: `Patear a ${target.displayName}`,
        }).addComponents(actionRow);

        if (!target) return;

        const filter: any = (i: any) => {
            if (i.customId === `kick-${int.user.id}`) return true;
        };

        if (target.id == int.user.id) {
            int.reply({
                embeds: [
                    errorEmbed.setDescription('🟥 No te suicides boludo!'),
                ],
                ephemeral: true,
            });
            return;
        }

        if (target.id == this.client.user?.id) {
            int.reply({
                embeds: [
                    errorEmbed.setDescription(
                        `🟥 Que haces!? Anda pa'ya bobo!`
                    ),
                ],
                ephemeral: true,
            });
            return;
        }

        await int.showModal(modal);
        //int.deferReply({ ephemeral: true });

        const modalSubmitInteraction = await int.awaitModalSubmit({
            filter,
            time: 10000,
        });

        reason = modalSubmitInteraction.fields.getTextInputValue('kickReason');
        try {
            const targetUser = await int.guild?.members.fetch(target.id);
            if (targetUser) {
                modalSubmitInteraction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('Blue')
                            .setDescription(
                                `🥾 Usuario: ${targetUser} fue pateado del server.`
                            ),
                    ],
                    ephemeral: true,
                });
                targetUser.kick(
                    `${reason} // Acción por : ${int.user.displayName}`
                );
            }
        } catch {
            modalSubmitInteraction.reply({
                embeds: [
                    errorEmbed.setDescription(`🟥 Error al patear al usuario.`),
                ],
                ephemeral: true,
            });
            return;
        }

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
                        .setThumbnail(target.displayAvatarURL())
                        .setAuthor({ name: `🥾 Pateado` })
                        .setDescription(
                            `**Usuario:** ${target.displayName} \`${target.id}\`\n**Razón:** \`${reason}\``
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
