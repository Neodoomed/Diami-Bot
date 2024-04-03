import {
    EmbedBuilder,
    Events,
    MessageContextMenuCommandInteraction,
    UserContextMenuCommandInteraction,
} from 'discord.js';
import Event from '../../classes/Event';
import CustomClient from '../../classes/CustomClient';
import ContextMenu from '../../classes/ContextMenu';

export default class ContextHandler extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.InteractionCreate,
            description: 'Context Menu handler event.',
            once: false,
        });
    }

    async Execute(
        int:
            | UserContextMenuCommandInteraction
            | MessageContextMenuCommandInteraction
    ) {
        if (!int.isModalSubmit) return;
        const command: ContextMenu = this.client.commands.get(int.commandName)!;
    }
}
