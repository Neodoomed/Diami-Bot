import { ChatInputCommandInteraction } from 'discord.js';
import CustomClient from '../../classes/CustomClient';

import SubCommand from '../../classes/SubCommand';

export default class SubTestTwo extends SubCommand {
    constructor(client: CustomClient) {
        super(client, {
            name: 'subtest.tree-time',
        });
    }

    async Execute(int: ChatInputCommandInteraction) {
        int.reply({
            content: `Pong 3`,
            ephemeral: true,
        });
    }
}
