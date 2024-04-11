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

export default class ReportContext extends ContextMenu {
    constructor(client: CustomClient) {
        super(client, {
            name: 'Reportar',
            category: Category.Administration,
            type: ApplicationCommandType.User,
            default_member_permissions:
                PermissionsBitField.Flags.UseApplicationCommands,
            dev: false,
        });
    }

    async Execute(int: UserContextMenuCommandInteraction) {
        const target = int.targetUser;
        let reason = ``;

        const errorEmbed = new EmbedBuilder().setColor('Red');

        const reportReason = new TextInputBuilder({
            customId: 'reportReason',
            label: 'Razón',
            style: TextInputStyle.Paragraph,
            placeholder: `Por que a razón quieres reportar al usuario ${target.displayName} ?`,
        });
        const actionRow =
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                reportReason
            );

        const modal = new ModalBuilder({
            customId: `report-${int.user.id}`,
            title: `Reportar a ${target.displayName}`,
        }).addComponents(actionRow);

        if (!target) return;

        const filter: any = (i: any) => {
            if (i.customId === `report-${int.user.id}`) return true;
        };

        await int.showModal(modal);
        //int.deferReply({ ephemeral: true });

        const modalSubmitInteraction = await int.awaitModalSubmit({
            filter,
            time: 30000,
        });

        reason =
            modalSubmitInteraction.fields.getTextInputValue('reportReason');
        try {
            const targetUser = await int.guild?.members.fetch(target.id);
            if (targetUser) {
                modalSubmitInteraction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('Blue')
                            .setDescription(
                                `El usuario ${targetUser} fue reportado al Staff.`
                            ),
                    ],
                    ephemeral: true,
                });
                const guild = await GuildConfig.findOne({
                    guildId: `${int.guildId}`,
                });

                if (guild && guild?.logs?.moderation?.enabled) {
                    const channelReport = (await int.guild?.channels.fetch(
                        guild?.channels.report
                    )) as TextChannel;
                    //if (!channelReport) return;
                    channelReport?.send({
                        embeds: [
                            new EmbedBuilder()
                                .setColor('Blue')
                                .setThumbnail(target.displayAvatarURL())
                                .setTitle(`❕ Reporte:`)
                                .setDescription(
                                    `El usuario  ${target} | \`\`${target.id}\`\` fue reportado. \n`
                                )
                                .addFields({
                                    name: `Reportado por:`,
                                    value: `${int.user} `,
                                })
                                .addFields({
                                    name: `Razón:`,
                                    value: `${reason}`,
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
        } catch (e) {
            modalSubmitInteraction.reply({
                embeds: [
                    errorEmbed.setDescription(
                        `🟥 Error al reportar usuario.\n ${e}`
                    ),
                ],
                ephemeral: true,
            });
            return;
        }
    }
}
