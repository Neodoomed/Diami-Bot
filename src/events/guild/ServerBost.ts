import {
    EmbedBuilder,
    Events,
    Guild,
    GuildMember,
    TextChannel,
} from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Event from '../../classes/Event';
import GuildConfig from '../../schemas/GuildConfig';

export default class GuildDelete extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.GuildMemberUpdate,
            description: 'Guild leave',
            once: false,
        });
    }

    async Execute(oldMember: GuildMember, newMember: GuildMember) {
        const oldStatus = oldMember.premiumSince;
        const newStatus = newMember.premiumSince;

        const guild = await GuildConfig.findOne({
            guildId: `${newMember.guild.id}`,
        });
        if (guild) {
            const channel = (await newMember.guild?.channels.fetch(
                guild?.channels.general
            )) as TextChannel;

            //if (!oldStatus && newStatus) {
            channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Purple')
                        //.setThumbnail(target.displayAvatarURL())
                        .setTitle(`Felicidades ${newMember.displayName}!!`)
                        .setDescription(
                            `Ahora eres VIP:\n` +
                                `- Cuentas con un canal de texto privado para VIPs \n` +
                                `- Tienes prioridad par las partidas de rol que realiza Jab \n` +
                                `- Tienes nitro`
                        )
                        .setThumbnail(
                            `https://media.discordapp.net/attachments/1227001009574772777/1227066904183836692/1upGreen.png?ex=66270e1b&is=6614991b&hm=8cd99b0e262a761d8e51de1ec3d2eddb6baab31825aa411a228a5ae6ac3454b0&=&format=webp&quality=lossless`
                        )
                        .setTimestamp()
                        .setFooter({
                            text:
                                `El Emperador Protege.` +
                                `\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t`,
                        }),
                ],
            });
            //}
        }
    }
}
