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

//import { ytdl } from 'ytdl-core';
import ytdl = require('@distube/ytdl-core');

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
        const url = int.options.getString('url');

        if (!url) return;

        //const player = createAudioPlayer();

        //@ts-ignore
        const guild = this.client.guilds.cache.get(int.guildId);
        //@ts-ignore
        const member = guild.members.cache.get(int.member.user.id);
        //@ts-ignore
        const voiceChannel = member.voice.channel;
        if (!voiceChannel) return;

        //const stream = ytdl(url, {
        //    filter: 'audioonly',
        //});
        const stream = await ytdl(url, {
            quality: 'highestaudio',
            filter: 'audioonly',
        });

        const resource = await createAudioResource(
            'https://www.televisiontunes.com/uploads/audio/Star%20Wars%20-%20Cantina%20Song.mp3',
            {
                inputType: StreamType.Opus,
            }
        );

        const connection = await joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        const player = createAudioPlayer();

        connection.subscribe(player);
        player.play(resource);

        player.on('error', (error) => {
            console.error(`Error: ${error.message}`);
        });

        player.on(AudioPlayerStatus.Idle, () => {
            const resource = createAudioResource(
                'https://www.televisiontunes.com/uploads/audio/Star%20Wars%20-%20Cantina%20Song.mp3',
                {
                    inputType: StreamType.Opus,
                }
            );
            player.play(resource);
        });

        return;
    }
}
