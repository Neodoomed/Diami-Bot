import {
    ApplicationCommand,
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    PermissionsBitField,
} from 'discord.js';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';

export default class Economy extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'economy',
            description: '🪙 Controla tus créditos.',
            category: Category.Economy,
            default_member_permissions:
                PermissionsBitField.Flags.UseApplicationCommands,
            dm_permissions: false,
            cooldown: 5,
            dev: false,
            options: [
                {
                    name: 'balance',
                    description: '🪙 Balance de tus créditos.',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [],
                },
                {
                    name: 'deposit',
                    description:
                        '🪙 Deposita tus créditos en la seguridad de tu cuenta.',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'amount',
                            description:
                                'Cantidad de créditos. (Se depositara todo si no especificas)',
                            type: ApplicationCommandOptionType.Number,
                            require: false,
                        },
                    ],
                },
                {
                    name: 'withdraw',
                    description:
                        '🪙 Retira tus créditos de tu cuenta.  (Se retirara todo si no especificas)',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'amount',
                            description: 'Cantidad de créditos.',
                            type: ApplicationCommandOptionType.Number,
                            require: false,
                        },
                    ],
                },
                {
                    name: 'daily',
                    description: '🪙 Recibe tu recompensa diaria.',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [],
                },
                {
                    name: 'share',
                    description: '🪙 Entrega créditos a alguien.',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'amount',
                            description: 'Cantidad de créditos.',
                            type: ApplicationCommandOptionType.Number,
                            require: true,
                        },
                        {
                            name: 'user',
                            description: 'Usuario objetivo.',
                            type: ApplicationCommandOptionType.User,
                            require: true,
                        },
                    ],
                },
            ],
        });
    }

    async Execute(int: ChatInputCommandInteraction) {}
}
