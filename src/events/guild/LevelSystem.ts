import {
    AttachmentBuilder,
    TextChannel,
    EmbedBuilder,
    Events,
    Guild,
    GuildMember,
    Message,
} from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Event from '../../classes/Event';
import UserLevel from '../../schemas/UserLevel';
import { createLevelUp } from '../../classes/CustomCanvas';
import { EconomySystem } from '../../classes/Economy';
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
        //const user = await message.guild?.members.cache.get(author.id)?.fetch();

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

        const give = Math.round(Math.random() * 3);
        const UserLevel = await new Level(author.id, guild.id);
        const level = await UserLevel.addExp(give);
        if (level > 0) {
            EconomySystem.addMoney(
                author.id,
                guild.id,
                'cash',
                level * level * 50 + 100
            );
            if (!channel) return;

            const image = new createLevelUp()
                .setUserName(author?.displayName)
                .setUserLevel(level)
                .setUserAvatar(author.displayAvatarURL());

            const buffer = await image.createImage();
            const attachment = new AttachmentBuilder(buffer).setName(
                `${author?.id}_lvlUp.png`
            );

            await (channel as TextChannel).send({
                files: [attachment],
            });
        }

        return;
    }
}
