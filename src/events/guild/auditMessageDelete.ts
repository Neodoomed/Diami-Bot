import { EmbedBuilder, Events, Guild, Message, TextChannel } from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Event from '../../classes/Event';
import GuildConfig from '../../schemas/GuildConfig';

export default class AuditMessageDelete extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.MessageDelete,
            description: '',
            once: false,
        });
    }

    async Execute(message: Message) {
        const guild = await GuildConfig.findOne({
            guildId: `${message.guildId}`,
        });

        const count = 1000;

        const deleted = message.content.slice(0, count);

        if (guild && guild?.logs?.moderation?.enabled) {
            const channelLog = (await message.guild?.channels.fetch(
                guild?.logs.moderation.channelId
            )) as TextChannel;
            channelLog?.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        //.setThumbnail(target.displayAvatarURL())
                        .setTitle(`🟥  Mensaje Eliminado.`)
                        .setDescription(
                            `**Autor:** ${message.author} **Canal:** ${message.channel}`
                        )
                        .addFields({
                            name: `Mensaje:`,
                            value: `${deleted}`,
                        })
                        .setThumbnail(
                            `https://media.discordapp.net/attachments/1227001009574772777/1227722999361441843/log.png?ex=66297125&is=6616fc25&hm=fc3f1dc2656fb2b5eaa6556ee3d9093cef36f93b62e48816921343d4e2a653e6&=&format=webp&quality=lossless`
                        )
                        .setTimestamp()
                        .setFooter({
                            text:
                                `El Emperador Protege.` +
                                `\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t`,
                        }),
                ],
            });
        }
        return;
    }
}
