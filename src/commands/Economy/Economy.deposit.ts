import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import CustomClient from '../../classes/CustomClient';

import SubCommand from '../../classes/SubCommand';
import { EconomySystem } from '../../classes/Economy';

export default class EconomyWithdraw extends SubCommand {
    constructor(client: CustomClient) {
        super(client, {
            name: 'economy.withdraw',
        });
    }

    async Execute(int: ChatInputCommandInteraction) {
        if (!int.guild) return;
        const bal = await EconomySystem.getBalance(int.user.id, int.guild.id);
        const user = int.options.get('target') || int.member;
        if (!user) return;
        let amount = int.options.getNumber('amount');

        const apiKey =
            '?ex=662ae775&is=66187275&hm=3000c98ab3e1a370d9639fc61df4f2c1b4c3458d06a0d4cf8773a92c9f9f85cd&=&format=webp&quality=lossless&width=562&height=562';

        const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`Tu Balance.`)
            .setThumbnail(
                `https://media.discordapp.net/attachments/1227001009574772777/1228124916755468348/credito.png${apiKey}`
            )
            .setFooter({
                text: 'El Emperador protege... tu economía. \u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t',
            });

        if (amount && bal.bank < amount) {
            embed.setDescription(
                `No tienes suficientes Créditos en los Bolsillos.`
            );
            int.reply({
                embeds: [embed],
            });
            return;
        }

        await EconomySystem.depositMoney(
            int.user.id,
            int.guild.id,
            amount || 'all'
        );

        if (!amount) amount = bal.cash;

        embed.setDescription(`Depositas ${amount} créditos.`).setFields(
            {
                name: 'Créditos en el bolsillo:',
                value: `${bal.cash + amount}`,
                inline: true,
            },
            {
                name: 'Créditos en el banco:',
                value: `${bal.bank - amount}`,
                inline: true,
            }
        );
        int.reply({
            embeds: [embed],
        });
        return;
    }
}
