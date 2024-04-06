import {
    CommandInteraction,
    Interaction,
    ModalSubmitInteraction,
} from 'discord.js';
import CustomClient from '../classes/CustomClient';

export default interface IComponent {
    client: CustomClient;
    name: string;
    description: string;

    Execute(client: CustomClient, int: Interaction, arg: string): void;
}
