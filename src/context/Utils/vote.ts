import {
    ApplicationCommandType,
    EmbedBuilder,
    MessageContextMenuCommandInteraction,
    PermissionsBitField,
    TextChannel,
} from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Category from '../../enums/Category';
import ContextMenu from '../../classes/ContextMenu';
import GuildConfig from '../../schemas/GuildConfig';

export default class VoteContext extends ContextMenu {
    constructor(client: CustomClient) {
        super(client, {
            name: 'Votación',
            category: Category.Utilities,
            type: ApplicationCommandType.Message,
            default_member_permissions: PermissionsBitField.Flags.KickMembers,
            dev: false,
        });
    }

    async Execute(int: MessageContextMenuCommandInteraction) {
        //await int.targetMessage.delete();

        await int.targetMessage.react('👍');
        await int.targetMessage.react('👎');

        await int.reply({
            content: 'Votación agregada.',
            ephemeral: true,
        });
        return;
    }
}
