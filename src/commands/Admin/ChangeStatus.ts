import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    PermissionsBitField,
} from 'discord.js';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';

export default class StatusDev extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'status-dev',
            description: '🖼️ Cambia el Estado (In Dev)',
            category: Category.Administration,
            default_member_permissions: PermissionsBitField.Flags.Administrator,
            dm_permissions: false,
            cooldown: 10,
            dev: false,
            options: [
                {
                    name: 'text',
                    description: 'Nuevo estado',
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
        });
    }

    async Execute(int: ChatInputCommandInteraction) {
        const status = int.options.getString('text');

        await this.client.user?.setPresence({
            activities: [
                {
                    name: 'Lista para matar a dios, o convertirme en él!...',
                    type: 4,
                },
            ],
        });

        await int.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('Red')
                    .setDescription(`🟩 Avatar cambiado correctamente.`),
            ],
        });
    }
}
