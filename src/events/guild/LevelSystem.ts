import { EmbedBuilder, Events, Guild, Message } from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Event from '../../classes/Event';
import UserLevel from '../../schemas/UserLevel';

export default class LevelSystem extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.MessageCreate,
            description: 'LevelSystem',
            once: false,
        });
    }

    async Execute(message: Message) {
        const { guild, author, channel } = message;

        if (message.content.length < 10) return;

        if (!guild || author.bot) return;
        try {
            let data = await UserLevel.findOne({
                guildId: `${guild.id}`,
                userId: `${author.id}`,
            });

            if (!data)
                data = await UserLevel.create({
                    guildId: guild.id,
                    userId: author.id,
                });

            const give = Math.round(Math.random() * 3);

            const requireXp = data.level * data.level * 20 + 20;

            if (data.xp + give >= requireXp) {
                data.xp = 0;
                data.totalXp += give;
                data.level += 1;
                await data.save();

                if (!channel) return;

                const embed = new EmbedBuilder()
                    .setColor('DarkBlue')
                    .setDescription(
                        `${author} felicidades, acabas de subir de nivel!`
                    );

                channel.send({
                    embeds: [embed],
                });
            } else {
                data.xp += give;
                data.totalXp += give;
                await data.save();
            }

            return;
        } catch (e) {
            this.client.logger.error(`${e}`);
            return;
        }
    }
}
