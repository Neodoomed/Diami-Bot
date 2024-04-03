import { ContextMenuCommandType } from 'discord.js';
import Category from '../enums/Category';

export default interface IContextMenuOptions {
    name: string;
    category: Category;
    type: ContextMenuCommandType;
    default_member_permissions: bigint;
    dev: boolean;
}
