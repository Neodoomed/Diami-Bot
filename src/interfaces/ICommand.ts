import {
    AutocompleteInteraction,
    ChatInputCommandInteraction,
} from 'discord.js';
import CustomClient from '../classes/CustomClient';
import Category from '../enums/Category';

export default interface ICommand {
    client: CustomClient;
    name: string;
    description: string;
    category: Category;
    options: object;
    default_member_permissions: bigint;
    dm_permissions: boolean;
    cooldown: number;
    dev: boolean;

    Execute(int: ChatInputCommandInteraction): Promise<void>;
    AutoComplete(int: AutocompleteInteraction): Promise<void>;
}
