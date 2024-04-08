import {
    ChatInputCommandInteraction,
    EmbedBuilder,
    PermissionsBitField,
} from 'discord.js';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';
import UserLevel from '../../schemas/UserLevel';

export default class LeaderBoard extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'leaderboard',
            description: 'Top rango de un usuario.',
            category: Category.Community,
            default_member_permissions:
                PermissionsBitField.Flags.UseApplicationCommands,
            dm_permissions: false,
            cooldown: 10,
            dev: false,
            options: [],
        });
    }

    async Execute(int: ChatInputCommandInteraction): Promise<any> {
        const { guild } = int;

        let text: string = '';

        const data = await UserLevel.find({ guildId: `${guild?.id}` })
            .sort({
                xp: -1,
                level: -1,
            })
            .limit(10);

        if (!data) return;

        await int.deferReply();

        for (const user of data) {
            //user.level
            const userTag = await this.client.user?.fetch(user.id);

            text = `\`${userTag} | XP: ${user.xp} | Level: ${user.level}\``;
        }

        int.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('Random')
                    .setTitle(`Top 10 de nivel de ${int.guild?.name}`)
                    .setDescription(text)
                    .setTimestamp()
                    .setFooter({
                        text: `El Emperador protege. LeaderBoard.`,
                    }),
            ],
        });
    }
}
