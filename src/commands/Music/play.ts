import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    PermissionsBitField,
} from 'discord.js';
import {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    StreamType,
    NoSubscriberBehavior,
    AudioPlayerStatus,
} from '@discordjs/voice';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';

export default class Play extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'play',
            description: 'Comando de prueba de reproductor de música',
            category: Category.Misc,
            default_member_permissions: PermissionsBitField.Flags.Administrator,
            dm_permissions: false,
            cooldown: 10,
            dev: false,
            options: [
                {
                    name: 'url',
                    description: 'url de la canción en Yt',
                    type: ApplicationCommandOptionType.String,
                    require: true,
                },
            ],
        });
    }

    async Execute(int: ChatInputCommandInteraction) {
        return;
    }
}
