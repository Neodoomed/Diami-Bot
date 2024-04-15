import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    PermissionsBitField,
} from 'discord.js';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';

export default class Help extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'help',
            description: '❓ Necesitas ayuda con el bot?',
            category: Category.Utilities,
            default_member_permissions:
                PermissionsBitField.Flags.UseApplicationCommands,
            dm_permissions: false,
            cooldown: 10,
            dev: false,
            options: [],
        });
    }

    async Execute(int: ChatInputCommandInteraction): Promise<any> {
        const selects = Category;
        const commands = this.client.commands.toJSON();
        return;
    }
}
