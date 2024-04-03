import { EmbedBuilder, Events, ModalSubmitInteraction } from 'discord.js';
import Event from '../../classes/Event';
import CustomClient from '../../classes/CustomClient';

export default class ModalHandler extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.InteractionCreate,
            description: 'Modal handler event.',
            once: false,
        });
    }

    async Execute(int: ModalSubmitInteraction) {
        if (!int.isModalSubmit) return;
        const modal = this.client.modals.get(int.customId);
        if (!modal) return;

        try {
            await modal.Execute(this.client, int);
        } catch (e) {
            this.client.logger.error(`${e}`);
        }
    }
}
