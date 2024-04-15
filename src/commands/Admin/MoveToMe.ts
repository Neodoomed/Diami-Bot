import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    PermissionsBitField,
} from 'discord.js';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';

export default class StatusDev extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'movetome',
            description:
                '🎤 Mueve a todos los miembros del canal de voz seleccionado al tuyo.',
            category: Category.Administration,
            default_member_permissions: PermissionsBitField.Flags.Administrator,
            dm_permissions: false,
            cooldown: 10,
            dev: false,
            options: [
                {
                    name: 'cannel',
                    description: 'Canal de voz',
                    type: ApplicationCommandOptionType.Channel,
                    required: true,
                },
            ],
        });
    }

    async Execute(int: ChatInputCommandInteraction) {
        const user = await int.guild?.members.cache.get(int.user.id)?.fetch();
        if (!user) return;
        const channel = await int.options.getUser('channel');

        if (!user?.voice.channel) {
            int.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setDescription(
                            '🟥 No te encuentras en ningún canal de voz.'
                        ),
                ],
                ephemeral: true,
            });
            return;
        }

        int.guild?.members.cache.forEach((member) => {
            if (member.id != user.id) return;
            if (member.voice.channel == channel)
                member.voice.setChannel(user.voice.channel);
        });

        int.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription(
                        `🟦 Se han movido todos los miembros del canal ${channel} a ${user.voice.channel}.`
                    ),
            ],
            ephemeral: true,
        });
    }
}
