import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    PermissionsBitField,
} from 'discord.js';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';
import { url } from 'inspector';

export default class Dice extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'dice',
            description: '🎲 Laza los dados',
            category: Category.Utilities,
            default_member_permissions:
                PermissionsBitField.Flags.UseApplicationCommands,
            dm_permissions: false,
            cooldown: 3,
            dev: false,
            options: [
                {
                    name: 'roll',
                    description:
                        'Tira los dados con la sintaxis de D&D. Ej: 1d20+5',
                    require: true,
                    type: ApplicationCommandOptionType.String,
                },
            ],
        });
    }

    async Execute(int: ChatInputCommandInteraction): Promise<any> {
        let total = 0;
        let res = '';
        let rndDice = 0;
        //@ts-ignore
        let dado = int.options
            .getString('roll')
            .split('d')
            .join(',')
            .split('+')
            .join(',')
            .split(',');
        let cant = parseInt(dado[0]);
        let dice = parseInt(dado[1]);
        let mod = parseInt(dado[2]);

        //for (let x = 0; x < dado.length; x++) {
        //   dado[x] = dado[x].toString().replace(/\s/g, '');
        //}
        if (isNaN(cant) || isNaN(dice))
            return int.reply({
                content: 'Los valores no son números.',
                ephemeral: true,
            });
        if (dice >= 101)
            return int.reply({
                content: 'El valor del dado demasiado grande.',
                ephemeral: true,
            });
        if (cant >= 20)
            return int.reply({
                content: 'Son demasiados dados.',
                ephemeral: true,
            });

        for (let i = 0; i < cant; i++) {
            rndDice = Math.trunc(Math.random() * dice) + 1;
            total += rndDice;
            i === 0 ? (res = `${rndDice}`) : (res += ` + ${rndDice}`);
        }
        if (dado[2]) {
            if (isNaN(mod))
                return int.reply({
                    content: 'Los valores no son números.',
                    ephemeral: true,
                });
            res += ` + ${mod}`;
            total += Math.trunc(mod);
        }

        const embed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(
                `${int.user.displayName} lanza ${int.options.getString('roll')}`
            )
            .setDescription(`${total} [ ${res} ]`)
            .setThumbnail(
                `https://cdn.pixabay.com/photo/2017/08/31/04/01/d20-2699387_960_720.png`
            )
            .setFooter({
                text:
                    `Enviado por ${int.user.displayName}` +
                    `\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t\u200B\t`,
                iconURL: int.user.displayAvatarURL({ extension: 'png' }),
            });
        int.reply({
            embeds: [embed],
        });
        return;
    }
}
