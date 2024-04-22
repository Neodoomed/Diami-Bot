import { Schema, model } from 'mongoose';

interface IFelizJueves {
    guildId: string;
    channel: {
        channelId: string;
        enabled: boolean;
    };
}

export default model<IFelizJueves>(
    'FelizJueves',
    new Schema<IFelizJueves>({
        guildId: String,
        channel: {
            channelId: String,
            enabled: Boolean,
        },
    })
);
