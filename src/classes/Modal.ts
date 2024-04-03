import { ModalSubmitInteraction, CacheType } from 'discord.js';
import IModal from '../interfaces/IModal';
import CustomClient from './CustomClient';

export default class Modal implements IModal {
    client: CustomClient;
    name: string;

    constructor(client: CustomClient, name: string) {
        this.client = client;
        this.name = name;
    }

    async Execute(
        client: CustomClient,
        int: ModalSubmitInteraction<CacheType>
    ) {}
}
