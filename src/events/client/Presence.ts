import {
    ActivityType,
    Collection,
    Events,
    PresenceUpdateStatus,
    REST,
    Routes,
    version,
} from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Event from '../../classes/Event';

export default class Presence extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.ClientReady,
            description: 'Bot Presence.',
            once: true,
        });
    }

    async Execute() {
        this.client.user?.setPresence({
            activities: [
                {
                    name: 'listo para matar a dios, o convertirme en él!...',
                    type: ActivityType.Playing,
                },
            ],
            status: PresenceUpdateStatus.Online,
        });
    }
}
