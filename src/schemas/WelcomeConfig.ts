import { Schema, model } from 'mongoose';

interface IWelcomeConfig {
    guildId: string;
    channelId: string;
    message: string;
    enabled: boolean;
}

export default model<IWelcomeConfig>(
    'WelcomeConfig',
    new Schema<IWelcomeConfig>({
        guildId: String,
        channelId: String,
        message: String,
        enabled: { type: Boolean, required: true, default: false },
    })
);
