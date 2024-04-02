import {
    CacheTypeReducer,
    ChatInputCommandInteraction,
    Collection,
    EmbedBuilder,
    Events,
} from 'discord.js';
import Event from '../../classes/Event';
import CustomClient from '../../classes/CustomClient';
import Command from '../../classes/Command';
import ContextMenu from '../../classes/ContextMenu';

export default class CommandHandler extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.InteractionCreate,
            description: 'Command handler event.',
            once: false,
        });
    }

    async Execute(int: ChatInputCommandInteraction) {
        if (!int.isChatInputCommand()) return;
        const command: Command = this.client.commands.get(int.commandName)!;

        if (!command) {
            int.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setDescription(
                            `🟥 El comando que intentas usar no existe.`
                        ),
                ],
                ephemeral: true,
            });
            this.client.commands.delete(int.commandName);
            return;
        }

        const { cooldowns } = this.client;
        if (!cooldowns.has(command.name))
            cooldowns.set(command.name, new Collection());

        const now = Date.now();
        const timestamps = cooldowns.get(command.name)!;
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (
            timestamps.has(int.user.id) &&
            now < (timestamps.get(int.user.id) || 0) + cooldownAmount
        ) {
            const timer = (
                ((timestamps.get(int.user.id) || 0) + cooldownAmount - now) /
                1000
            ).toFixed(1);
            return await int.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setDescription(
                            `🚫 Espera otros ${timer} segundos para volver a usar el comando.`
                        ),
                ],
                ephemeral: true,
            });
        }

        timestamps.set(int.user.id, now);
        setTimeout(() => timestamps.delete(int.user.id), cooldownAmount);

        try {
            const subCommandGroup = int.options.getSubcommandGroup(false);
            const subCommand = `${int.commandName}${subCommandGroup ? `.${subCommandGroup}` : ''}.${int.options.getSubcommand(false) || ''}`;
            return (
                (await this.client.subCommands.get(subCommand)?.Execute(int)) ||
                (await command.Execute(int))
            );
        } catch (e) {
            this.client.logger.error(`${e}`);
        }
    }
}
