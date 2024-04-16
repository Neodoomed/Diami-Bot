import { ModalSubmitInteraction, CacheType, EmbedBuilder } from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Components from '../../classes/Component';
import WelcomeConfig from '../../schemas/WelcomeConfig';

export default class ConfigWelcomeModal extends Components {
    constructor(client: CustomClient) {
        super(client, {
            name: 'config_welcome-modal',
            description: 'Modal de Config Welcome Message',
        });
    }
    async Execute(
        client: CustomClient,
        int: ModalSubmitInteraction<CacheType>
    ) {
        const message = int.fields.getTextInputValue('welcomeMessage');

        let welcome = await WelcomeConfig.findOne({
            guildId: `${int.guildId}`,
        });
        if (!welcome) return;

        welcome.message = message;
        await welcome.save();

        int.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('Green')
                    .setDescription(
                        `🟩 Actualizado mensaje de Bienvenida:\n\`\`${message}\`\``
                    ),
            ],
        });
        return;
    }
}
