import {
    ModalSubmitInteraction,
    CacheType,
    CommandInteraction,
    Interaction,
} from 'discord.js';
import CustomClient from './CustomClient';
import IComponent from '../interfaces/IComponent';
import IComponentOptions from '../interfaces/IComponentOptions';

export default class Components implements IComponent {
    client: CustomClient;
    name: string;
    description: string;

    constructor(client: CustomClient, options: IComponentOptions) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
    }

    async Execute(
        client: CustomClient,
        int: Interaction<CacheType>,
        arg: string
    ) {}
}
