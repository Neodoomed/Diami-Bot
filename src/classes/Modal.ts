import { ModalSubmitInteraction, CacheType } from 'discord.js';
import IModal from '../interfaces/IModal';
import CustomClient from './CustomClient';
import IInteraction from '../interfaces/IInteraction';

export default class Modal implements IModal {
    client: CustomClient;
    name: string;
    description: string;

    constructor(client: CustomClient, options: IInteraction) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
    }

    async Execute(
        client: CustomClient,
        int: ModalSubmitInteraction<CacheType>
    ) {}
}
