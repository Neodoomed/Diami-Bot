import {
    ApplicationCommandOptionType,
    AttachmentBuilder,
    ChatInputCommandInteraction,
    EmbedBuilder,
    PermissionsBitField,
} from 'discord.js';
import Command from '../../classes/Command';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import cardTarot from '../../enums/CardTarot';

export default class Tarot extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'tarot',
            description: '🎴 Pregúntale a las cartas tu destino.',
            category: Category.Community,
            default_member_permissions:
                PermissionsBitField.Flags.UseApplicationCommands,
            dm_permissions: false,
            cooldown: 10,
            dev: false,
            options: [
                {
                    name: 'pregunta',
                    description:
                        'Cantidad de créditos. (Se depositara todo si no especificas)',
                    type: ApplicationCommandOptionType.String,
                    require: false,
                },
            ],
        });
    }

    async Execute(int: ChatInputCommandInteraction): Promise<any> {
        const text = int.options.getString('pregunta');
        const cards = Object.keys(cardTarot);
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        const isReversed = Math.random() < 0.5;
        //@ts-ignore
        const selectCard = cardTarot[randomCard];
        const card = isReversed ? `${randomCard}(Invertida)` : randomCard;
        const detail = isReversed ? selectCard.revés : selectCard.derecho;

        const reverseCardImage = async (imageUrl: string): Promise<Buffer> => {
            const canvas = createCanvas(387, 646);
            const ctx = canvas.getContext('2d');
            const image = await loadImage(imageUrl);
            ctx.translate(193, 323);
            ctx.rotate(Math.PI); // Gira la imagen en 180 grados (inversión)
            ctx.drawImage(image, -193, -323, 387, 646);
            return canvas.toBuffer('image/png');
        };

        const msgEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`Ahora Diami a leer tus cartas.`)
            .setDescription(`**Consulta:** ${text}`)
            .addFields({ name: `${card}`, value: `${detail}` })
            .setThumbnail(
                'https://media.discordapp.net/attachments/1227001009574772777/1228832279749722222/tarot.png?ex=662d7a3e&is=661b053e&hm=5c41fc7968661a803f6b8608929d46d6e6cba0ac31d85c11c7a8ee87613a4542&=&format=webp&quality=lossless'
            )
            .setFooter({
                text: `Pregunta realizada por: ${int.user.username}`,
            });

        if (isReversed) {
            const reversedImageBuffer = await reverseCardImage(
                selectCard.image
            );
            const attachment = new AttachmentBuilder(reversedImageBuffer, {
                name: 'reversed_card.png',
            });

            msgEmbed.setImage('attachment://reversed_card.png');

            return await int.reply({
                embeds: [msgEmbed],
                files: [attachment],
            });
        } else {
            msgEmbed.setImage(selectCard.image);

            return await int.reply({
                embeds: [msgEmbed],
            });
        }
    }
}
