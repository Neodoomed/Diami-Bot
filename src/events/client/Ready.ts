import { Collection, Events, REST, Routes, version } from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Event from '../../classes/Event';
import mongoose from 'mongoose';

export default class Ready extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.ClientReady,
            description: 'Ready',
            once: true,
        });
    }

    async Execute() {
        this.client.logger.info(`Bot ${this.client.user?.tag} online`);
        this.client.logger.info(`Bot ID: ${this.client.user?.id}`);
        this.client.logger.info(`DJS Version: v${version}`);
        this.client.logger.info(`Node Version: ${process.version}`);
        this.client.logger.info(`Mongo Version: v${mongoose.version}`);

        const clientId = this.client.developmentMode
            ? this.client.config.devClientId
            : this.client.config.clientId;
        const rest = new REST().setToken(
            this.client.developmentMode
                ? this.client.config.devToken
                : this.client.config.token
        );

        // Clear Global commands
        rest.put(Routes.applicationCommands(clientId), {
            body: [],
        });
        // Clear Dev commands
        rest.put(
            Routes.applicationGuildCommands(
                clientId,
                this.client.config.devGuildId
            ),
            {
                body: [],
            }
        );

        const globalCommands: any = await rest.put(
            Routes.applicationCommands(clientId),
            {
                body: this.GetJson(
                    this.client.commands.filter((command) => !command.dev)
                ),
            }
        );
        this.client.logger.info(
            `Sincronizados ${globalCommands.length} (/) comandos Globales.`
        );

        if (this.client.developmentMode) {
            const devCommands: any = await rest.put(
                Routes.applicationGuildCommands(
                    clientId,
                    this.client.config.devGuildId
                ),
                {
                    body: this.GetJson(
                        this.client.commands.filter((command) => command.dev)
                    ),
                }
            );
            this.client.logger.info(
                `Sincronizados ${devCommands.length} (/) comandos Dev.`
            );
        }
        // ctrl k c
    }

    private GetJson(commands: Collection<string, any>): object[] {
        const data: object[] = [];

        commands.forEach((command) => {
            data.push({
                name: command.name,
                description: command.description,
                options: command.options,
                type: command.type,
                default_member_permissions:
                    command.default_member_permissions.toString(),
                dm_permissions: command.dm_permissions,
            });
        });

        return data;
    }
}
