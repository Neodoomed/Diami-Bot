import {
    ModalSubmitInteraction,
    CacheType,
    TextChannel,
    EmbedBuilder,
} from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Components from '../../classes/Component';
import GuildConfig from '../../schemas/GuildConfig';

export default class ConfessionModal extends Components {
    constructor(client: CustomClient) {
        super(client, {
            name: 'confession-modal',
            description: 'Confession Modal',
        });
    }
    async Execute(
        client: CustomClient,
        int: ModalSubmitInteraction<CacheType>
    ) {
        const guild = await GuildConfig.findOne({
            guildId: `${int.guildId}`,
        });
        const confession = int.fields.getTextInputValue('message');

        if (guild && guild?.channels.confession) {
            const channel = (await int.guild?.channels.fetch(
                guild?.channels.confession
            )) as TextChannel;

            await channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Confesión Anónima')
                        .setDescription(confession)
                        .setThumbnail(
                            //'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'
                            'https://media.discordapp.net/attachments/1227001009574772777/1227731734473216142/user.png?ex=66297947&is=66170447&hm=a77151daaabc95eeafeb3f4f385419c367d058193d46bb6bd5164c9e872eb262&=&format=webp&quality=lossless&width=640&height=640'
                        )
                        .setTimestamp()
                        .setColor('Random')
                        .setFooter({
                            text:
                                `El Emperador Protege.` +
                                `\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t`,
                        }),
                ],
            });

            await int.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(
                            `Tu confesión a sido enviada al canal ${channel}.\nDescuida es totalmente anónima.`
                        )
                        .setFooter({
                            text: `Enviado `,
                        })
                        .setColor('Random'),
                ],
                ephemeral: true,
            });
        }
        if (guild && guild?.channels.confessionAdmin) {
            const channel = (await int.guild?.channels.fetch(
                guild?.channels.confessionAdmin
            )) as TextChannel;

            await channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`Confesión de ||${int.user.displayName}||`)
                        .setDescription(`||${confession}||`)
                        .setTimestamp()
                        .setColor('Random'),
                ],
            });
        }
        return;
    }
}
