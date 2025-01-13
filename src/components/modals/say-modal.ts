import {
    ModalSubmitInteraction,
    CacheType,
    TextChannel,
    EmbedBuilder,
} from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Components from '../../classes/Component';
import GuildConfig from '../../schemas/GuildConfig';

export default class SayModal extends Components {
    constructor(client: CustomClient) {
        super(client, {
            name: 'say-modal',
            description: 'Say Modal',
        });
    }
    async Execute(
        client: CustomClient,
        int: ModalSubmitInteraction<CacheType>
    ) {
        const text = int.fields.getTextInputValue('message');
        //@ts-ignore
        await int.channel.send({ content: text });

        await int.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`Mensaje envinado`)
                    .setFooter({
                        text: `Enviado `,
                    })
                    .setColor('Random'),
            ],
            ephemeral: true,
        });

        return;
    }
}
