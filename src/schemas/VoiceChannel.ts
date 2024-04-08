import { Schema, model } from 'mongoose';

interface IUserLevel {
    guildId: string;
    userId: string;
    startTime: number;
    totalTime: number;
    online: boolean;
}

export default model<IUserLevel>(
    'VoiceChannel',
    new Schema<IUserLevel>({
        guildId: { type: String, required: true },
        userId: { type: String, required: true },
        startTime: { type: Number, required: true, default: 0 },
        totalTime: { type: Number, required: true, default: 0 },
        online: { type: Boolean, required: true, default: false },
    })
);
