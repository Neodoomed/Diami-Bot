import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import ICustomClient from '../interfaces/ICustomClient';
import { IConfig } from '../interfaces/IConfig';
import Logger from './Logger';
import * as dotenv from 'dotenv';
import Handler from './Handler';
import Command from './Command';
import SubCommand from './SubCommand';
import mongoose, { connection } from 'mongoose';
import Components from './Component';

dotenv.config();

export default class CustomClient extends Client implements ICustomClient {
    config: IConfig;
    logger: Logger;
    handler: Handler;
    commands: Collection<string, Command | any>;
    commandsList: any[];
    subCommands: Collection<string, SubCommand>;
    components: Collection<string, Components>;
    cooldowns: Collection<string, Collection<string, number>>;
    developmentMode: boolean;

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildVoiceStates,
            ],
            partials: [
                Partials.User,
                Partials.Channel,
                Partials.GuildMember,
                Partials.Message,
                Partials.Reaction,
            ],
        });
        this.config = {
            token: process.env.DISCORD_TOKEN as string,
            devToken: process.env.DISCORD_TOKEN_DEV as string,
            prefix: process.env.PREFIX as string,
            //
            clientId: process.env.CLIENT_ID as string,
            devClientId: process.env.CLIENT_ID_DEV as string,
            //
            guildId: process.env.GUILD_ID as string,
            devGuildId: process.env.GUILD_ID_DEV as string,
            //
            mongoUrl: process.env.MONGO_URL as string,
            mongoUser: process.env.MONGO_USER as string,
            mongoPassword: process.env.MONGO_PASSWORD as string,
            mongoDb: process.env.MONGO_DB as string,
            devMongoDb: process.env.MONGO_DB_DEV as string,
        };
        this.logger = new Logger('logfile.log');
        this.handler = new Handler(this);
        this.commands = new Collection();
        this.subCommands = new Collection();
        this.components = new Collection();
        this.commandsList = [];
        this.cooldowns = new Collection();
        this.developmentMode = process.argv.slice(2).includes('--dev');
    }

    Init(): void {
        this.LoadHandler();
        this.logger.debug(
            `Inicializando el bot en modo ${this.developmentMode ? 'development' : 'production'}.`
        );
        this.login(
            this.developmentMode ? this.config.devToken : this.config.token
        ).catch((e) => this.logger.error(e));

        this.MongoConnect();
    }

    LoadHandler(): void {
        this.handler.LoadEvents();
        this.handler.LoadCommands();
        this.handler.LoadContextMenus();
        this.handler.LoadComponents();
        this.handler.NonCrash();
    }

    async MongoConnect(): Promise<void> {
        const url: string = `mongodb+srv://${this.config.mongoUser}:${this.config.mongoPassword}@${this.config.mongoUrl}${this.developmentMode ? this.config.devMongoDb : this.config.mongoDb}?retryWrites=true&w=majority`;
        mongoose.connect(url);
        //.then(() => this.logger.mongo(`Conectado a MongoDB`))
        //.catch((e) => this.logger.mongo(e));
        mongoose.Promise = global.Promise;
        connection.on('connected', () => {
            this.logger.mongo(
                `Conectado a ${this.developmentMode ? this.config.devMongoDb : this.config.mongoDb}.`
            );
        });
        connection
            .on('connecting', () => {
                this.logger.mongo(`Conectando...`);
            })
            .on('disconnected', () => {
                this.logger.mongo(`Conexión perdida.`);
            })
            .on('open', () => {
                this.logger.mongo(`Base de datos abierta.`);
            })
            .on('close', () => {
                this.logger.mongo(`Base de datos cerrada.`);
            })
            .on('fullsetup', () => {
                this.logger.mongo(`Carga completa.`);
            })
            .on('error', (e) => {
                this.logger.mongo(`[ERROR] e`);
            })
            .on('SIGINT', () => {
                mongoose.connection.close();
            });
    }
}
