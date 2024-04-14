import { Schema, model } from 'mongoose';

interface IEconomy {
    guildId: string;
    userId: string;
    cash: number;
    bank: number;
    daily: {
        lastDaily: Date;
    };
}

export default model<IEconomy>(
    'Economy',
    new Schema<IEconomy>({
        guildId: String,
        userId: String,
        cash: { type: Number, default: 0 },
        bank: { type: Number, default: 0 },
        daily: {
            lastDaily: Date,
        },
    })
);
