import { EmbedBuilder, Events, GuildMember, TextChannel } from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Event from '../../classes/Event';
import WelcomeConfig from '../../schemas/WelcomeConfig';

export default class MemberAdd extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.GuildMemberAdd,
            description: 'Mensaje de bienvenida',
            once: false,
        });
    }

    async Execute(member: GuildMember) {
        const welcome = await WelcomeConfig.findOne({
            guildId: `${member.guild.id}`,
        });

        if (welcome?.enabled) {
            const channel = (await member.guild?.channels.fetch(
                welcome.channelId
            )) as TextChannel;
            if (!channel) return;
            const keyImage =
                '?ex=66305a98&is=661de598&hm=d512bf0664e6da4f69f0e976c3036d7b6165900a717bc5c786bf93edbd991ff6&=&format=png&quality=lossless';
            const diami =
                'https://media.discordapp.net/attachments/1003047615409176627/1229747872438681631/welcome.png';
            //if (!oldStatus && newStatus) {

            let message = welcome?.message
                .replace('{USERID}', `${member.id}`)
                .replace('{USERMENTION}', `<@${member.id}>`)
                .replace('{USERNAME}', `${member.displayName}`)
                .replace('{SERVER}', `${member.guild.name}`);

            channel.send({
                content: `${member}`,
                embeds: [
                    new EmbedBuilder()
                        .setColor('Purple')
                        //.setThumbnail(target.displayAvatarURL())
                        .setTitle(`Ey! Bienvenido ${member.displayName}!!`)
                        //.setDescription(
                        //    `Bienvenid@ ${member} soy Diami, la bibliotecaria del Diagrama, y la encargada de darte la bienvenida!\n- No olvides pasar por <id:customize> para configurar el server a tu gusto.\n- Tampoco olvides visitar las <#774727090188320812> del server.`
                        //)
                        .setDescription(`${message}`)
                        //.setThumbnail(`${diami}${keyImage}`)
                        //.setImage(`${imageUrl}`)
                        .setImage(`${diami}${keyImage}`)
                        .setTimestamp()
                        .setFooter({
                            text:
                                `El Emperador Protege.` +
                                `\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B`,
                        }),
                ],
                //content: `# Ey! Bienvenid@ ${member}!! \nSoy Diami, la bibliotecaria del Diagrama, y la encargada de darte la bienvenida!\n- No olvides pasar por <id:customize> para configurar el server a tu gusto.\n- Tampoco olvides visitar las <#774727090188320812> del server.\n${diami}${keyImage}`,
                allowedMentions: { users: [member.id] },
            });
        }
        return;
    }
}
