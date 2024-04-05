import IHandler from '../interfaces/IHandler';
import path = require('path');
import { glob } from 'glob';
import CustomClient from './CustomClient';
import Event from './Event';
import Command from './Command';
import SubCommand from './SubCommand';
import ContextMenu from './ContextMenu';
import Modal from './Modal';
import Button from './Button';
import { connection } from 'mongoose';

export default class Handler implements IHandler {
    client: CustomClient;
    constructor(client: CustomClient) {
        this.client = client;
    }

    async LoadEvents() {
        const file = (await glob(`dist/events/**/*.js`)).map((filePath) =>
            path.resolve(filePath)
        );

        file.map(async (file: string) => {
            const event: Event = new (await import(file)).default(this.client);
            if (!event.name) {
                this.client.logger.error(
                    '${file.split("/").pop()} no tiene nombre'
                );
                return delete require.cache[require.resolve(file)];
            }
            const execute = (...args: any) => event.Execute(...args);

            //@ts-ignore
            if (event.once) this.client.once(event.name, execute);
            //@ts-ignore
            else this.client.on(event.name, execute);

            return delete require.cache[require.resolve(file)];
        });
    }

    async LoadCommands() {
        const file = (await glob(`dist/commands/**/*.js`)).map((filePath) =>
            path.resolve(filePath).replace(/\\/g, '/')
        );

        file.map(async (file: string) => {
            const command: Command | SubCommand = new (
                await import(file)
            ).default(this.client);

            if (!command.name) {
                this.client.logger.error(
                    '${file.split("/").pop()} no tiene nombre'
                );
                return delete require.cache[require.resolve(file)];
            }
            if (file.split('/').pop()?.split('.')[2]) {
                this.client.subCommands.set(
                    command.name,
                    command as SubCommand
                );
                return;
            }

            this.client.commands.set(command.name, command as Command);

            return delete require.cache[require.resolve(file)];
        });
    }

    async LoadContextMenus() {
        const file = (await glob(`dist/context/**/*.js`)).map((filePath) =>
            path.resolve(filePath).replace(/\\/g, '/')
        );

        file.map(async (file: string) => {
            const contextMenu: ContextMenu = new (await import(file)).default(
                this.client
            );

            if (!contextMenu.name) {
                this.client.logger.error(
                    '${file.split("/").pop()} no tiene nombre'
                );
                return delete require.cache[require.resolve(file)];
            }

            //this.client.contextMenus.set(
            this.client.commands.set(
                contextMenu.name,
                contextMenu as ContextMenu
            );

            return delete require.cache[require.resolve(file)];
        });
    }

    async LoadComponents() {
        const file = (await glob(`dist/components/**/*.js`)).map((filePath) =>
            path.resolve(filePath).replace(/\\/g, '/')
        );

        file.map(async (file: string) => {
            const component: Modal | Button = new (await import(file)).default(
                this.client
            );

            if (!component.name) {
                this.client.logger.error(
                    '${file.split("/").pop()} no tiene nombre'
                );
                return delete require.cache[require.resolve(file)];
            }

            if (file.split('/').filter(Boolean).slice(-2, -1)[0] == 'modals')
                this.client.modals.set(component.name, component as Modal);

            if (file.split('/').filter(Boolean).slice(-2, -1)[0] == 'buttons')
                this.client.buttons.set(component.name, component as Button);

            return delete require.cache[require.resolve(file)];
        });
    }

    async NonCrash() {
        process.removeAllListeners();
        process.on(
            'unhandledRejection',
            async (reason: string, promise: Promise<any>) => {
                this.client.logger.warning(`Crash: Promesa rechaza:.`);
                this.client.logger.warning(`${reason}.`);
            }
        );
        process.on(
            'uncaughtException',
            async (reason: string, promise: Promise<any>) => {
                this.client.logger.warning(`Crash: Error de Exception.`);
                this.client.logger.warning(`${reason}.`);
            }
        );
        process.on(
            'uncaughtExceptionMonitor',
            async (reason: string, promise: Promise<any>) => {
                this.client.logger.warning(`Crash: Error de Exception.`);
                this.client.logger.warning(`${reason}.`);
            }
        );
    }

    async mongoEvents() {
        connection.on('connected', () => {
            this.client.logger.mongo(`Conectado.`);
        });
        connection.on('connecting', () => {
            this.client.logger.mongo(`Conectando...`);
        });
        connection.on('disconnected', () => {
            this.client.logger.mongo(`Conexión perdida.`);
        });
        connection.on('error', (e) => {
            this.client.logger.mongo(`[ERROR] e`);
        });
    }
}
