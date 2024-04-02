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

export default class ConfigLogs extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'config-log',
            description: 'Configuración del log del Bot.',
            category: Category.Configuration,
            default_member_permissions: PermissionsBitField.Flags.Administrator,
            dm_permissions: false,
            cooldown: 5,
            dev: false,
            options: [
                {
                    name: 'toggle',
                    description: 'Activa/desactiva',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'log-type',
                            description: 'Tipo de logging.',
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            choices: [
                                {
                                    name: 'Log de Moderación',
                                    value: 'moderation',
                                },
                                {
                                    name: 'Log Dev',
                                    value: 'develop',
                                },
                            ],
                        },
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
                    description: 'Setear el canal de Logging',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'log-type',
                            description: 'Tipo de logging.',
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            choices: [
                                {
                                    name: 'Log de Moderación',
                                    value: 'moderation',
                                },
                            ],
                        },
                        {
                            name: 'channel',
                            description: 'Seleccionar canal',
                            type: ApplicationCommandOptionType.Channel,
                            required: true,
                            channel_types: [ChannelType.GuildText],
                        },
                    ],
                },
            ],
        });
    }
    async Execute(int: ChatInputCommandInteraction) {}
}
