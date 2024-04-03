import { CommandInteraction } from 'discord.js';
import CustomClient from '../classes/CustomClient';

export default interface IButton {
    client: CustomClient;
    name: string;

    Execute(client: CustomClient, int: CommandInteraction): void;
}
