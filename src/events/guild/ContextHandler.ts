import {
    ContextMenuCommandInteraction,
    EmbedBuilder,
    Events,
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

    async Execute(int: ContextMenuCommandInteraction) {
        if (!int.isContextMenuCommand()) return;
        const command: ContextMenu = this.client.commands.get(int.commandName)!;

        if (!command) {
            int.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setDescription(
                            `🟥 El comando que intentas usar no existe.`
                        ),
                ],
                ephemeral: true,
            });
            this.client.commands.delete(int.commandName);
            return;
        }

        try {
            await command.Execute(int);
        } catch (e) {
            this.client.logger.error(`${e}`);
        }
    }
}
