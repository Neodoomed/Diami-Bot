import { Schema, model } from 'mongoose';

interface IChatAi {
    guildId: string;
    message: {
        role: string;
        content: string;
    };
    date: Date;
}

export default model<IChatAi>(
    'ChatAi',
    new Schema<IChatAi>({
        guildId: String,
        message: {
            role: String,
            content: String,
        },
        date: Date,
    })
);
