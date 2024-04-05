import { EmbedBuilder, Events, ModalSubmitInteraction } from 'discord.js';
import Event from '../../classes/Event';
import CustomClient from '../../classes/CustomClient';
import Modal from '../../classes/Modal';

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
        if (!int.customId) return;
        const modal: Modal = this.client.modals.get(int.customId)!;
        if (!modal) {
            int.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setDescription(
                            `🟥 El Modal que intentas usar no existe.`
                        ),
                ],
                ephemeral: true,
            });
            return;
        }
        try {
            await modal.Execute(this.client, int);
        } catch (e) {
            this.client.logger.error(`${e}`);
            return;
        }
    }
}
