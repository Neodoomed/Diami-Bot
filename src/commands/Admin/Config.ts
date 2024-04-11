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

export default class Config extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'config',
            description: 'Configuración del server.',
            category: Category.Configuration,
            default_member_permissions: PermissionsBitField.Flags.Administrator,
            dm_permissions: false,
            cooldown: 5,
            dev: false,
            options: [
                {
                    name: 'channels',
                    description: 'Setear el canales',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'type',
                            description: 'Tipo de canal.',
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            choices: [
                                {
                                    name: 'General',
                                    value: 'general',
                                },
                                {
                                    name: 'Bienvenida',
                                    value: 'welcome',
                                },
                                {
                                    name: 'Reglas',
                                    value: 'rules',
                                },
                                {
                                    name: 'Confesión',
                                    value: 'confession',
                                },
                                {
                                    name: 'NSFW',
                                    value: 'nsfw',
                                },
                                {
                                    name: 'Sugerencias',
                                    value: 'ticket',
                                },
                                {
                                    name: 'Reporte',
                                    value: 'report',
                                },
                            ],
                        },
                        {
                            name: 'set-channel',
                            description: 'Seleccionar canal',
                            type: ApplicationCommandOptionType.Channel,
                            required: true,
                            channel_types: [ChannelType.GuildText],
                        },
                    ],
                },
                {
                    name: 'roles',
                    description: 'Setear los Roles',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'type',
                            description: 'Tipo de rol.',
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            choices: [
                                {
                                    name: 'Mod',
                                    value: 'mod',
                                },
                                {
                                    name: 'Muteado',
                                    value: 'muted',
                                },
                                {
                                    name: 'Notificaciones',
                                    value: 'notifications',
                                },
                            ],
                        },
                        {
                            name: 'set-role',
                            description: 'Selecciona rol',
                            type: ApplicationCommandOptionType.Role,
                            required: true,
                        },
                    ],
                },
            ],
        });
    }
    async Execute(int: ChatInputCommandInteraction) {}
}
