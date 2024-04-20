import {
    ApplicationCommandOptionType,
    AttachmentBuilder,
    ChatInputCommandInteraction,
    EmbedBuilder,
    PermissionsBitField,
} from 'discord.js';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';
import { profileImage } from 'discord-arts';

import { createLevelUp } from '../../classes/CustomCanvas';
import Level from '../../classes/Level';

export default class Rank extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'rank',
            description: '🔝 Obtiene el rango de un usuario o el tuyo.',
            category: Category.Community,
            default_member_permissions:
                PermissionsBitField.Flags.UseApplicationCommands,
            dm_permissions: false,
            cooldown: 10,
            dev: false,
            options: [
                {
                    name: 'user',
                    description:
                        'Usuario objetivo. (Si no se especifica el usuario seras tu',
                    type: ApplicationCommandOptionType.User,
                    require: false,
                },
            ],
        });
    }

    async Execute(int: ChatInputCommandInteraction): Promise<any> {
        const user = await int.options.getUser('user')?.fetch();

        const member = int.guild?.members.cache.get(
            !user ? int.user.id : user.id
        );
        if (!member) return;

        if (!int.guild?.id) return;
        const UserLevel = await new Level(member.id, int.guild?.id);

        const embed = new EmbedBuilder()
            .setColor('Orange')
            .setTitle('Rank')
            .setDescription(`🟪 ${member} no ha conseguido experiencia aun.`);

        //if (!data) return await int.reply({ embeds: [embed] });

        await int.deferReply();

        /*let format = 'png';
        if (user.banner?.substring(0, 2) === 'a_') format = 'gif';

        const customBanner = user.banner
            ? `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${format}?size=512`
            : 'https://i.imgur.com/LWcWzlc.png';
        */
        let badges = [];
        let customDate = 'Miembro';

        if (member.user.bot) {
            badges.push('https://cdn3.emoji.gg/emojis/4165-bot.png');
            customDate = 'Bot';
        } else if (member.permissions.has('KickMembers')) {
            if (member.permissions.has('Administrator')) {
                badges.push(
                    'https://cdn3.emoji.gg/emojis/8925-blurple-verified.png'
                );
                customDate = 'Admin';
            } else {
                badges.push('https://cdn3.emoji.gg/emojis/3460-verified.png');
                customDate = 'Mod';
            }
        }
        // buscar mas emojis en https://emoji.gg/
        // para rol https://emoji.gg/emoji/2321-nat20

        const buffer = await profileImage(member.id, {
            customBadges: badges,
            //borderColor: member.displayHexColor,
            badgesFrame: true,
            customDate: customDate,
            moreBackgroundBlur: true,
            backgroundBrightness: 100,
            removeAvatarFrame: false,
            rankData: {
                currentXp: await UserLevel.getLevelXp(),
                requiredXp: await UserLevel.getExpRequired(),
                level: await UserLevel.getLevel(),
                barColor: '#fb933f',
                levelColor: '#8e7ec2',
                autoColorRank: true,
            },
        });

        const attachment = new AttachmentBuilder(buffer).setName(
            `${member.id}_rank.gif`
        );

        const color = (await member.user.fetch()).accentColor;

        return int.editReply({
            //embeds: [
            //    new EmbedBuilder()
            //        .setColor(color ?? 'DarkButNotBlack')
            //        .setTitle(`${member.displayName} rank.`)
            //        .setImage(`attachment://${member.id}_rank.gif`),
            //],
            files: [attachment],
        });
    }
}
