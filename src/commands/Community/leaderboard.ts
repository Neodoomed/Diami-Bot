import {
    ChatInputCommandInteraction,
    EmbedBuilder,
    PermissionsBitField,
} from 'discord.js';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';
import UserLevel from '../../schemas/UserLevel';
import path = require('path');

export default class LeaderBoard extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'leaderboard',
            description: '🔝 Top rango de un usuario.',
            category: Category.Community,
            default_member_permissions:
                PermissionsBitField.Flags.UseApplicationCommands,
            dm_permissions: false,
            cooldown: 10,
            dev: false,
            options: [],
        });
    }

    async Execute(int: ChatInputCommandInteraction) {
        const { guild } = int;
        let rank: string = '';
        let userTag: string = '';
        let level: string = '';
        let exp: string = '';
        const data = await UserLevel.find({ guildId: `${guild?.id}` })
            .sort({
                exp: -1,
                level: -1,
            })
            .limit(10);

        if (!data) return;

        await int.deferReply();

        for (let i = 0; i < data.length; i++) {
            const user = await this.client.users.fetch(data[i].userId);
            //const user = int.guild?.members.cache.get(data[i].userId);
            //rank += `${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}\n`;
            //userTag += `**${user}**\n`;
            //level += `**${data[i].level}**  \`\`exp:${data[i].exp}\`\` \n`;
            rank += `${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1} - **${user}**\n`;
            level += `**${data[i].level}**\n`;
            exp += `\`\`exp:${data[i].exp}\`\`\n`;
        }
        const embed = await new EmbedBuilder()
            .setColor('Random')
            .setTitle(`🔼 Top de ${int.guild?.name} 🔼`)
            .addFields(
                { name: '🔝 - User', value: `${rank}`, inline: true },
                { name: 'Level', value: `${level}`, inline: true },
                { name: 'Exp', value: `${exp}`, inline: true }
            )
            //.setThumbnail(
            //    `https://media.discordapp.net/attachments/1003047615409176627/1226747761571926016/approval.png?ex=6625e4e2&is=66136fe2&hm=0941f4ffcc185a377386dc104382cb8b24e2b1fa69b11ce7e3d618f7642c04aa&=&format=webp&quality=lossless`
            //)
            .setTimestamp()
            .setFooter({
                text: `LeaderBoard.\t\t\t\t\t\t\t\tEl Emperador protege.`,
            });
        int.editReply({
            embeds: [embed],
        });
    }
}
