import {
    CacheType,
    ContextMenuCommandInteraction,
    ContextMenuCommandType,
} from 'discord.js';
import Category from '../enums/Category';
import CustomClient from './CustomClient';
import IContextMenuOptions from '../interfaces/IContextMenuOptions';
import IContextMenu from '../interfaces/IContextMenu';

export default class ContextMenu implements IContextMenu {
    client: CustomClient;
    name: string;
    category: Category;
    type: ContextMenuCommandType;
    default_member_permissions: bigint;
    dev: boolean;

    constructor(client: CustomClient, options: IContextMenuOptions) {
        this.client = client;
        this.name = options.name;
        this.category = options.category;
        this.type = options.type;
        this.default_member_permissions = options.default_member_permissions;
        this.dev = options.dev || false;
    }

    async Execute(int: ContextMenuCommandInteraction<CacheType>) {}
}
