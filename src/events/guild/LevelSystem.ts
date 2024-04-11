import { EmbedBuilder, Events, Guild, Message } from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Event from '../../classes/Event';
import UserLevel from '../../schemas/UserLevel';
import { createLevelUp } from '../../classes/CustomCanvas';
import Level from '../../classes/Level';

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

        if (
            message.content.includes('http://') ||
            message.content.includes('https://')
        )
            return;
        if (message.content.length < 10) return;
        if (!message.content.split(' ')[1]) return;

        if (message.content.includes('asd')) return;
        if (message.content.includes('qwe')) return;
        if (message.content.includes('zxc')) return;
        if (message.content.includes('lorem')) return;
        if (message.content.includes('ipsum')) return;

        let letters = message.content.replace(/[^a-zA-Z]/g, '');
        let percent = letters.length / message.content.length;
        let umbral = 0.4;
        if (percent < umbral) return;

        if (!guild || author.bot) return;

        const give = Math.round(Math.random() * 10);

        const UserLevel = await new Level(author.id, guild.id);
        const level = await UserLevel.addExp(give);
        if (level > 0) {
            if (!channel) return;

            const embed = new EmbedBuilder()
                .setColor('DarkBlue')
                .setThumbnail(
                    `https://cdn.discordapp.com/attachments/1227001009574772777/1227005966071890100/1up.png?ex=6626d55a&is=6614605a&hm=193b99963102c6efa825f6700c165bd2350b0033b5c21fed6feb0a71bc0deddf&`
                )
                .setDescription(
                    `## ${author}, subes de nivel ${level - 1} a ${level}! \u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B`
                );

            channel.send({
                embeds: [embed],
            });
        }

        return;
    }
}
