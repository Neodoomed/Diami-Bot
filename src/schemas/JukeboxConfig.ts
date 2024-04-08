import { Schema, model } from 'mongoose';

interface IJukeboxConfig {
    guildId: string;
    config: {
        messageId: string;
        channelId: string;
    };
}

export default model<IJukeboxConfig>(
    'JukeboxConfig',
    new Schema<IJukeboxConfig>({
        guildId: String,
        config: {
            messageId: String,
            channelId: String,
        },
    })
);
