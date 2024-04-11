import { EmbedBuilder, Events, Guild, Message, TextChannel } from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Event from '../../classes/Event';
import GuildConfig from '../../schemas/GuildConfig';

export default class AuditMessageCreate extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.MessageUpdate,
            description: '',
            once: false,
        });
    }

    async Execute(oldMessage: Message, newMessage: Message) {
        const guild = await GuildConfig.findOne({
            guildId: `${oldMessage.guildId}`,
        });

        if (oldMessage.author.bot) return;
        if (oldMessage.content === newMessage.content) return;

        const count = 1000;

        const original = oldMessage.content.slice(0, count);
        const edited = newMessage.content.slice(0, count);

        if (guild && guild?.logs?.moderation?.enabled) {
            const channelLog = (await oldMessage.guild?.channels.fetch(
                guild?.logs.moderation.channelId
            )) as TextChannel;
            channelLog?.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Yellow')
                        //.setThumbnail(target.displayAvatarURL())
                        .setTitle(`🟨 Mensaje Editado.`)
                        .setDescription(
                            `\nMensaje https://discord.com/channels/${newMessage.guildId}/${newMessage.channelId}/${newMessage.id}` +
                                ` de <@${newMessage.author.id}> en el canal <#${newMessage.channel.id}>\n`
                        )
                        .addFields({
                            name: `Mensaje original:`,
                            value: `${original}`,
                        })
                        .addFields({
                            name: `Mensaje editado:`,
                            value: `${edited}`,
                        })
                        .setTimestamp()
                        .setThumbnail(
                            `https://media.discordapp.net/attachments/1227001009574772777/1227722999361441843/log.png?ex=66297125&is=6616fc25&hm=fc3f1dc2656fb2b5eaa6556ee3d9093cef36f93b62e48816921343d4e2a653e6&=&format=webp&quality=lossless`
                        )
                        .setFooter({
                            text:
                                `El Emperador Protege.` +
                                `\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B`,
                        }),
                ],
            });
        }
        return;
    }
}
