import { ModalSubmitInteraction, CacheType } from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Modal from '../../classes/Modal';

export default class TestModal extends Modal {
    constructor(client: CustomClient) {
        super(client, {
            name: 'test-modal',
            description: 'Modal test',
        });
    }
    async Execute(
        client: CustomClient,
        int: ModalSubmitInteraction<CacheType>
    ) {
        const test = int.fields.getTextInputValue('test');

        int.reply({
            content: `${test}`,
            ephemeral: true,
        });
        return;
    }
}
