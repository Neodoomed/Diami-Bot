import { Schema, model } from 'mongoose';

interface IUserLevel {
    guildId: string;
    userId: string;
    xp: number;
    totalXp: number;
    level: number;
}

export default model<IUserLevel>(
    'LevelSystem',
    new Schema<IUserLevel>({
        guildId: { type: String, required: true },
        userId: { type: String, required: true },
        xp: { type: Number, required: true, default: 0 },
        totalXp: { type: Number, required: true, default: 0 },
        level: { type: Number, required: true, default: 0 },
    })
);
