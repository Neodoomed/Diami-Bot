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
import { createLevelUp } from '../../classes/CustomCanvas';

export default class TestCanvas extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'canvas',
            description: '❓',
            category: Category.Utilities,
            default_member_permissions: PermissionsBitField.Flags.Administrator,
            dm_permissions: false,
            cooldown: 10,
            dev: false,
            options: [],
        });
    }

    async Execute(int: ChatInputCommandInteraction): Promise<any> {
        const user = await int.guild?.members.cache.get(int.user.id)?.fetch();

        if (!user) return;

        const bg = int.user.bannerURL({ size: 512 }) as string;

        const image = new createLevelUp()
            .setUserName(user.displayName)
            .setUserLevel(8)
            .setCustomBackground(bg)
            .setUserAvatar(user?.displayAvatarURL());

        await int.deferReply();

        const buffer = await image.createImage();
        const attachment = new AttachmentBuilder(buffer).setName(
            `${user.id}_rank.png`
        );

        return int.editReply({
            files: [attachment],
        });
    }
}
