import {
    ActionRowBuilder,
    ApplicationCommandOptionType,
    ButtonBuilder,
    ButtonStyle,
    ChatInputCommandInteraction,
    ComponentType,
    EmbedBuilder,
    PermissionsBitField,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ChannelType,
    GuildBasedChannel,
} from 'discord.js';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';

export default class Help extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'help',
            description: '❓ Necesitas ayuda con el bot?',
            category: Category.Utilities,
            default_member_permissions:
                PermissionsBitField.Flags.UseApplicationCommands,
            dm_permissions: false,
            cooldown: 10,
            dev: false,
            options: [],
        });
    }

    async Execute(int: ChatInputCommandInteraction): Promise<any> {
        const selects = Category;
        const commands = this.client.commands;
        let commandsList = {};

        commands.forEach((command) => {
            const cmd = [];
            cmd.push({
                name: command.name,
                description: command.description,
            });
            //@ts-ignore
            commandsList[command.category] = cmd;
        });

        let categories = [
            {
                label: 'Categories',
                description: 'Lista de categorías',
                value: 'Categories',
                icon: '📋',
                default: true,
            },
            {
                label: 'Utilities',
                description: 'Comandos útiles',
                value: 'Utilities',
                icon: '🧩',
                default: false,
            },
            {
                label: 'Community',
                description: 'Comandos de la comunidad',
                value: 'Community',
                icon: '👥',
                default: false,
            },
            {
                label: 'Games',
                description: 'Comandos de juegos',
                value: 'Games',
                icon: '🎮',
                default: false,
            },
            {
                label: 'Misc',
                description: 'Comandos que no tiene una categoría clara',
                value: 'Misc',
                icon: '🎲',
                default: false,
            },
            {
                label: 'Economy',
                description: 'Comandos de Economía',
                value: 'Economy',
                icon: '🪙',
                default: false,
            },
        ];

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId(int.id)
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions(
                categories.map((category) =>
                    new StringSelectMenuOptionBuilder()
                        .setLabel(category.label)
                        .setDescription(category.description)
                        .setValue(category.value)
                        .setEmoji(category.icon)
                        .setDefault(category.default)
                )
            );

        const actionRow = new ActionRowBuilder().addComponents(
            selectMenu
        ) as any;

        const buttonClose = new ButtonBuilder()
            .setCustomId(`${int.id}-close`)
            .setStyle(ButtonStyle.Danger)
            .setLabel('✖');
        const buttonNext = new ButtonBuilder()
            .setCustomId(`${int.id}-next`)
            .setStyle(ButtonStyle.Danger)
            .setLabel('▶');
        const buttonBack = new ButtonBuilder()
            .setCustomId(`${int.id}-back`)
            .setStyle(ButtonStyle.Danger)
            .setLabel('◀');

        const actionRowButtons = new ActionRowBuilder().addComponents(
            buttonClose
        ) as any;

        const embedBase = new EmbedBuilder()
            .setColor('Orange')
            .setTitle('Comandos de Diami')
            .setFooter({
                text: `©Xardax.\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\tEl Emperador protege.`,
            });

        await int.reply({
            embeds: [embedBase],
            components: [actionRow, actionRowButtons],
            ephemeral: true,
        });

        const filter: any = (i: any) => {
            if (i.user.id === `${int.user.id}` && i.customId === int.id)
                return true;
        };
        if (int.channel === null) return;
        if (int.channel.type !== ChannelType.GuildText) return;
        const collector = int.channel.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            filter: filter,
            time: 60000,
        });

        collector?.on('collect', async (interaction) => {
            const value = interaction.values[0];
            //const commandList = commands
            //commandsList[value]
            if (value != 'Categories') {
                let content = `### Lista de comandos ${value}:\n`;
                interaction.update({
                    embeds: [embedBase.setDescription(content)],
                });
            }
        });

        //return;
    }
}
