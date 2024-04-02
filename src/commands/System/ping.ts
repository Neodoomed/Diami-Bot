import {
    ApplicationCommand,
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    PermissionsBitField,
} from 'discord.js';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';

export default class Ping extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'ping',
            description: 'Ping del Bot.',
            category: Category.Utilities,
            default_member_permissions:
                PermissionsBitField.Flags.UseApplicationCommands,
            dm_permissions: false,
            cooldown: 5,
            dev: false,
            options: [],
        });
    }

    async Execute(int: ChatInputCommandInteraction) {
        const embed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`Calculando latencia...`)
            .setTitle('Ping');
        const message = await int.reply({
            //content: 'Calculando...',
            embeds: [embed],
            fetchReply: true,
            allowedMentions: { repliedUser: true },
        });
        const responseMessage = `API Latency: ${this.client.ws.ping}ms\nClient Latency: ${
            message.createdTimestamp - int.createdTimestamp
        }ms`;
        await int.editReply({
            embeds: [embed.setDescription(responseMessage)],
        });
    }
}
