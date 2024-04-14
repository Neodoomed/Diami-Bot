import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    Events,
    Guild,
    GuildMember,
    PermissionsBitField,
} from 'discord.js';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';

export default class Emit extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'emit',
            description: '🔹 Emite un evento.',
            category: Category.Developer,
            default_member_permissions: PermissionsBitField.Flags.Administrator,
            dm_permissions: false,
            cooldown: 1,
            dev: true,
            options: [
                {
                    name: 'event',
                    description: 'Evento a emir...',
                    require: true,
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        { name: 'GuildCreate', value: Events.GuildCreate },
                        { name: 'GuildDelete', value: Events.GuildDelete },
                        {
                            name: 'GuildMemberUpdate',
                            value: Events.GuildMemberUpdate,
                        },
                    ],
                },
            ],
        });
    }

    async Execute(int: ChatInputCommandInteraction) {
        const event = int.options.getString('event');

        if (event == Events.GuildCreate || event == Events.GuildDelete) {
            this.client.emit(event, int.guild as Guild);
        }
        if (event == Events.GuildMemberUpdate) {
            this.client.emit(
                event,
                int.member as GuildMember,
                int.member as GuildMember
            );
        }

        int.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('Green')
                    .setDescription(`Emitido Evento - \`${event}\``),
            ],
            ephemeral: true,
        });
    }
}
