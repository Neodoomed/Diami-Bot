import {
    ApplicationCommand,
    ApplicationCommandOptionType,
    ChannelType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    PermissionsBitField,
} from 'discord.js';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';
import path = require('path');

export default class ConfigWelcome extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'config-welcome',
            description: '🎚️ Configuración la bienvenida del Bot.',
            category: Category.Configuration,
            default_member_permissions: PermissionsBitField.Flags.Administrator,
            dm_permissions: false,
            cooldown: 5,
            dev: false,
            options: [
                {
                    name: 'toggle',
                    description: '🎚️ Activa/desactiva',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'toggle',
                            description: 'Activa/desactivar',
                            type: ApplicationCommandOptionType.Boolean,
                            required: true,
                        },
                    ],
                },
                {
                    name: 'set',
                    description: '🎚️ Setear el canal',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'channel',
                            description: 'Seleccionar canal',
                            type: ApplicationCommandOptionType.Channel,
                            required: true,
                            channel_types: [ChannelType.GuildText],
                        },
                    ],
                },
                {
                    name: 'message',
                    description: '🎚️ Setear el Mensaje',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [],
                },
            ],
        });
    }
    async Execute(int: ChatInputCommandInteraction) {}
}
