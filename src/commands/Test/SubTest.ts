import {
    ApplicationCommand,
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    PermissionsBitField,
} from 'discord.js';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';

export default class SubTest extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'subtest',
            description: 'Test de Sub Comandos',
            category: Category.Utilities,
            default_member_permissions:
                PermissionsBitField.Flags.UseApplicationCommands,
            dm_permissions: false,
            cooldown: 3,
            dev: true,
            options: [
                {
                    name: 'one-time',
                    description: 'option test',
                    type: ApplicationCommandOptionType.Subcommand,
                },
                {
                    name: 'two-time',
                    description: 'option test',
                    type: ApplicationCommandOptionType.Subcommand,
                },
                {
                    name: 'tree-time',
                    description: 'option test',
                    type: ApplicationCommandOptionType.Subcommand,
                },
            ],
        });
    }

    async Execute(int: ChatInputCommandInteraction) {
        const subcmd = int.options.getSubcommand(false);

        if (subcmd == 'one-time') {
            int.reply({
                content: `Pong 1`,
                ephemeral: true,
            });
        }
        if (subcmd == 'two-time') {
            int.reply({
                content: `Pong 2`,
                ephemeral: true,
            });
        }
    }
}
