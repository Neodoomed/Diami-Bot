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
} from 'discord.js';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';

export default class CopperMind extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'registros',
            description: 'Déjame buscar la información que necesitas por ti',
            category: Category.Utilities,
            default_member_permissions:
                PermissionsBitField.Flags.UseApplicationCommands,
            dm_permissions: false,
            cooldown: 10,
            dev: false,
            options: [
                {
                    name: 'wiki',
                    description: 'Que saga quieres saber',
                    type: ApplicationCommandOptionType.String,
                    require: true,
                    choices: [
                        {
                            name: 'Cosmere',
                            value: 'es.coppermind.net/w/',
                        },
                    ],
                },
                {
                    name: 'query',
                    description: 'Que quieres preguntar',
                    type: ApplicationCommandOptionType.String,
                    require: true,
                },
            ],
        });
    }

    async Execute(int: ChatInputCommandInteraction): Promise<any> {
        const query = await int.options.getString('query');
        const wiki = await int.options.getString('wiki');
        if (!query) return;

        const rest = 'rest.php/v1/search/page';
        const api =
            'api.php?action=query&format=json&prop=extracts&exintro=true&titles=';

        //const url = 'https://es.coppermind.net/w/rest.php/v1/search/page';
        //api.php?action=query&format=json&prop=extracts&titles=${encodeURIComponent(searchTerm)}&exintro=true
        // api.php?action=query&format=json&prop=revisions&titles=API%3AGeosearch&formatversion=2&rvprop=content&rvslots=main&rvlimit=1
        // api.php?action=query&prop=revisions&titles=Cthulhu&rvprop=content&format=json

        // api.php?action=query&prop=revisions&rvprop=content&format=json&explaintext=true&exintro=true&titles=

        //api.php?action=query&prop=extracts&exintro=true&format=json&explaintext=true&titles=Titus
        try {
            const rsp = await fetch(
                `https://${wiki}${rest}?q=${encodeURIComponent(query)}&limit=1`
            );
            const data = await rsp.json();

            if (data.pages.length > 0) {
                const wikiApiUrl = `https://${wiki}${api}${encodeURIComponent(data.pages[0].title)}`;
                const wikiResponse = await fetch(wikiApiUrl);
                const wikiData = await wikiResponse.json();
                const page = Object.values(wikiData.query.pages)[0];
                //@ts-ignore
                const firstParagraph = page.extract.replace(/<[^>]*>/g, '');

                const result = data.pages[0];
                const embed = new EmbedBuilder()
                    .setColor('Purple')
                    .setTitle(
                        `Esto encontré en los registros sobre ${result.title}.`
                    )
                    .setDescription(`${firstParagraph}`)
                    .setThumbnail(
                        'https://media.discordapp.net/attachments/1003047615409176627/1231263051328782456/OIG3_3.jpg?ex=66365213&is=6623dd13&hm=ba5131c0c45569bc1d14ab3d5190f0289f0d61163d67c60e8cc5fab83d3a0cc8&=&format=webp&width=562&height=562'
                    )
                    .setFooter({
                        text: `Powered by Coppermind.com\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\tEl Emperador protege.`,
                    });

                if (result.thumbnail) embed.setImage(result.thumbnail.url);

                int.reply({
                    embeds: [embed],
                });
            } else {
                int.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('Purple')
                            .setTitle(`Lo lamento...`)
                            .setDescription(
                                `No pude encontrar nada en los registros sobre "${query}".\n- Asegúrese de haber escrito bien lo que buscas.\n- Asegúrese de estar buscando en la saga correcta.`
                            )
                            .setThumbnail(
                                'https://media.discordapp.net/attachments/1003047615409176627/1231263051328782456/OIG3_3.jpg?ex=66365213&is=6623dd13&hm=ba5131c0c45569bc1d14ab3d5190f0289f0d61163d67c60e8cc5fab83d3a0cc8&=&format=webp&width=562&height=562'
                            )
                            .setFooter({
                                text: `Powered by Coppermind.com\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\tEl Emperador protege.`,
                            }),
                    ],
                });
            }
        } catch (error) {
            console.error(error);
            int.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Purple')
                        .setTitle(`Hubo un error al realizar la búsqueda.`)
                        .setFooter({
                            text: `Powered by Coppermind.com\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\tEl Emperador protege.`,
                        }),
                ],
                ephemeral: true,
            });
        }
    }
}
