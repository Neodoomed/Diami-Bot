import { Events, Interaction } from 'discord.js';
import Event from '../../classes/Event';
import CustomClient from '../../classes/CustomClient';

export default class ModalHandler extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.InteractionCreate,
            description: 'Component event handler.',
            once: false,
        });
    }

    async Execute(int: Interaction<'cached'>) {
        if (int.isModalSubmit()) {
            if (!int.customId) return;
            const modal = this.client.components.get(int.customId)!;
            if (modal) {
                try {
                    await modal.Execute(this.client, int, '');
                } catch (e) {
                    this.client.logger.error(`${e}`);
                    return;
                }
            }
        } else if (int.isButton()) {
            if (!int.customId) return;
            const buttonId = int.customId.split('_');
            const button = this.client.components.get(buttonId[0]);
            if (button) {
                try {
                    await button.Execute(
                        this.client,
                        int,
                        buttonId.slice(1).toString()
                    );
                } catch (e) {
                    this.client.logger.error(`${e}`);
                    return;
                }
            }
        }
    }
}
