import { CacheType, CommandInteraction } from 'discord.js';
import CustomClient from './CustomClient';
import IButton from '../interfaces/IButton';

export default class Button implements IButton {
    client: CustomClient;
    name: string;

    constructor(client: CustomClient, name: string) {
        this.client = client;
        this.name = name;
    }

    async Execute(client: CustomClient, int: CommandInteraction<CacheType>) {}
}
