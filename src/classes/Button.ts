import { CacheType, CommandInteraction } from 'discord.js';
import CustomClient from './CustomClient';
import IButton from '../interfaces/IButton';
import IInteraction from '../interfaces/IInteraction';

export default class Button implements IButton {
    client: CustomClient;
    name: string;
    description: string;

    constructor(client: CustomClient, options: IInteraction) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
    }

    async Execute(client: CustomClient, int: CommandInteraction<CacheType>) {}
}
