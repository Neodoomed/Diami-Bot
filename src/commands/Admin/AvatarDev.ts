import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    PermissionsBitField,
} from 'discord.js';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';

export default class AvatarDev extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'avatar-dev',
            description: '🖼️ Cambia el Avatar por uno animado (In Dev)',
            category: Category.Administration,
            default_member_permissions: PermissionsBitField.Flags.Administrator,
            dm_permissions: false,
            cooldown: 10,
            dev: false,
            options: [
                {
                    name: 'avatar',
                    description: 'Avatar animado',
                    type: ApplicationCommandOptionType.Attachment,
                    required: true,
                },
            ],
        });
    }

    async Execute(int: ChatInputCommandInteraction) {
        const avatar = int.options.getAttachment('avatar');

        await this.client.user?.setAvatar(avatar?.url || null).catch((e) => {
            int.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setDescription(`🟥 Error: \`${e}\``),
                ],
            });
            return;
        });

        await int.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('Red')
                    .setDescription(`🟩 Avatar cambiado correctamente.`),
            ],
        });
    }
}
