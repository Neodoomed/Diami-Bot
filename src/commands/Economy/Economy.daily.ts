import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import CustomClient from '../../classes/CustomClient';

import SubCommand from '../../classes/SubCommand';
import { EconomySystem } from '../../classes/Economy';

export default class EconomyDairy extends SubCommand {
    constructor(client: CustomClient) {
        super(client, {
            name: 'economy.daily',
        });
    }

    async Execute(int: ChatInputCommandInteraction) {
        if (!int.guild) return;
        const bal = await EconomySystem.getBalance(int.user.id, int.guild.id);
        const user = int.options.get('target') || int.member;
        if (!user) return;
        const apiKey =
            '?ex=662ae775&is=66187275&hm=3000c98ab3e1a370d9639fc61df4f2c1b4c3458d06a0d4cf8773a92c9f9f85cd&=&format=webp&quality=lossless&width=562&height=562';
        const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`Daily.`)
            .setThumbnail(
                `https://media.discordapp.net/attachments/1227001009574772777/1228124916755468348/credito.png${apiKey}`
            )
            .setFooter({
                text: 'El Emperador protege... tu economía. \u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t',
            });
        const daily = await EconomySystem.daily(int.user.id, int.guild.id);
        if (!daily) {
            embed.setDescription(
                `Aun no se cumple el tiempo para volver a reclamar tu cuota diaria.`
            );
        } else {
            embed.setDescription(
                `Has obtenido ${daily} créditos. Dentro de 24h podrás volver a reclamar mas.`
            );
        }

        int.reply({
            embeds: [embed],
            ephemeral: true,
        });
    }
}
