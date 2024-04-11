import { Schema, model } from 'mongoose';

interface IGuildConfig {
    guildId: string;
    channels: {
        nsfw: string;
        confession: string;
        general: string;
        welcome: string;
        rules: string;
        ticket: string;
        report: string;
    };
    logs: {
        moderation: {
            enabled: boolean;
            channelId: string;
        };
        develop: {
            enabled: boolean;
            channelId: string;
        };
    };
}

export default model<IGuildConfig>(
    'GuildConfig',
    new Schema<IGuildConfig>(
        {
            guildId: String,
            channels: {
                nsfw: String,
                confession: String,
                general: String,
                welcome: String,
                rules: String,
                ticket: String,
                report: String,
            },
            logs: {
                moderation: {
                    enabled: Boolean,
                    channelId: String,
                },
                develop: {
                    enabled: Boolean,
                    channelId: String,
                },
            },
        },
        {
            timestamps: true,
        }
    )
);
