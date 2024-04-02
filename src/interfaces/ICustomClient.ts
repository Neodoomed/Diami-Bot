import { Collection } from 'discord.js';
import { IConfig } from './IConfig';
import Command from '../classes/Command';
import SubCommand from '../classes/SubCommand';
import ContextMenu from '../classes/ContextMenu';

export default interface ICustomClient {
    config: IConfig;
    //TOKEN: string;
    commands: Collection<string, any>;
    subCommands: Collection<string, SubCommand>;
    cooldowns: Collection<string, Collection<string, number>>;
    developmentMode: boolean;

    Init(): void;
    LoadHandler(): void;
    MongoConnect(): void;
}
