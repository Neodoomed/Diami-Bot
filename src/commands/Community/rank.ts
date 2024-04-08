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
import UserLevel from '../../schemas/UserLevel';
import { profileImage } from 'discord-arts';

export default class Rank extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'rank',
            description: 'Obtiene el rango de un usuario.',
            category: Category.Community,
            default_member_permissions:
                PermissionsBitField.Flags.UseApplicationCommands,
            dm_permissions: false,
            cooldown: 10,
            dev: false,
            options: [
                {
                    name: 'user',
                    description: 'Usuario',
                    type: ApplicationCommandOptionType.User,
                    require: false,
                },
            ],
        });
    }

    async Execute(int: ChatInputCommandInteraction): Promise<any> {
        const user = await int.options.getUser('user')?.fetch();
        if (!user) return;

        const member = int.guild?.members.cache.get(user.id);

        if (!member) return;

        const data = await UserLevel.findOne({
            guildId: `${int.guild?.id}`,
            userId: `${user.id}`,
        });

        const embed = new EmbedBuilder()
            .setColor('Purple')
            .setTitle('Rank')
            .setDescription(`🟪 ${member} no ha conseguido experiencia aun.`);

        if (!data) return await int.reply({ embeds: [embed] });

        await int.deferReply();

        const required = data.level * data.level * 20 + 20;

        let format = 'png';
        if (user.banner?.substring(0, 2) === 'a_') format = 'gif';

        const customBanner = user.banner
            ? `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${format}?size=512`
            : 'https://i.imgur.com/LWcWzlc.png';

        const buffer = await profileImage(member.id, {
            //customBadges: [  './skull.png', './rocket.png', './crown.png'  ],
            //borderColor: member.displayHexColor,
            badgesFrame: true,
            //customBackground: customBanner,
            moreBackgroundBlur: true,
            backgroundBrightness: 100,
            removeAvatarFrame: false,
            rankData: {
                currentXp: data.xp,
                requiredXp: required,
                level: data.level,
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
            embeds: [
                new EmbedBuilder()
                    .setColor(color ?? 'DarkButNotBlack')
                    .setTitle(`${member.displayName} rank.`)
                    .setImage(`attachment://${member.id}_rank.gif`),
            ],
            files: [attachment],
        });
    }
}
