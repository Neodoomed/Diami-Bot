import { Schema, model } from 'mongoose';

interface IUserLevel {
    guildId: string;
    userId: string;
    exp: number;
    level: number;
}

export default model<IUserLevel>(
    'LevelSystem',
    new Schema<IUserLevel>({
        guildId: { type: String, required: true },
        userId: { type: String, required: true },
        exp: { type: Number, required: true, default: 0 },
        level: { type: Number, required: true, default: 0 },
    })
);
