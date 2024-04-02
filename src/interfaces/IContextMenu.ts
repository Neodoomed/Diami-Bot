import {
    ContextMenuCommandInteraction,
    ContextMenuCommandType,
} from 'discord.js';
import CustomClient from '../classes/CustomClient';
import Category from '../enums/Category';

export default interface IContextMenu {
    client: CustomClient;
    name: string;
    category: Category;
    type: ContextMenuCommandType;
    default_member_permissions: bigint;
    dev: boolean;

    Execute(int: ContextMenuCommandInteraction): void;
}
