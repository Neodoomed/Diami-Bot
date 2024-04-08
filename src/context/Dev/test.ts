import {
    ApplicationCommandType,
    ContextMenuCommandInteraction,
    PermissionsBitField,
    UserContextMenuCommandInteraction,
} from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';
import ContextMenu from '../../classes/ContextMenu';

export default class TestContext extends ContextMenu {
    constructor(client: CustomClient) {
        super(client, {
            name: 'Test Context',
            category: Category.Developer,
            type: ApplicationCommandType.User,
            default_member_permissions: PermissionsBitField.Flags.Administrator,
            dev: true,
        });
    }

    async Execute(int: UserContextMenuCommandInteraction) {
        int.reply({
            content: 'Test Context',
            ephemeral: true,
        });
    }
}
