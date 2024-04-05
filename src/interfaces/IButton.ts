import { CommandInteraction } from 'discord.js';
import CustomClient from '../classes/CustomClient';

export default interface IButton {
    client: CustomClient;
    name: string;
    description: string;

    Execute(client: CustomClient, int: CommandInteraction): void;
}
