import Economy from '../schemas/Economy';

export class EconomySystem {
    public static async getBalance(userId: string, guildId: string) {
        let economy = await Economy.findOne({ userId, guildId });
        if (!economy) {
            economy = await new Economy({ userId, guildId });
            economy.save();
            return { cash: 0, bank: 0 };
        }
        return { cash: economy.cash, bank: economy.bank };
    }

    public static async addMoney(
        userId: string,
        guildId: string,
        target: 'cash' | 'bank',
        amount: number
    ): Promise<number> {
        const economy = await Economy.findOne({ userId, guildId });
        if (!economy) {
            new Economy({ userId, guildId, [target]: amount }).save();

            return amount;
        }
        economy[target] += amount;
        economy.save();
        return economy[target];
    }

    public static async removeMoney(
        userId: string,
        guildId: string,
        target: 'cash' | 'bank',
        amount: number
    ): Promise<number> {
        const economy = await Economy.findOne({ userId, guildId });
        if (!economy) {
            new Economy({ userId, guildId, [target]: -amount }).save();
            return -amount;
        }
        economy[target] -= amount;
        economy.save();
        return economy[target];
    }

    public static async depositMoney(
        userId: string,
        guildId: string,
        amount: number | 'all'
    ) {
        const economy = await Economy.findOne({ userId, guildId });
        if (!economy) return false;
        if (amount === 'all') amount = economy.cash;
        if (!economy.cash || economy.cash < amount) return false;
        economy.cash -= amount;
        economy.bank += amount;
        economy.save();
        return true;
    }

    public static async withdrawMoney(
        userId: string,
        guildId: string,
        amount: number | 'all'
    ) {
        const economy = await Economy.findOne({ userId, guildId });
        if (!economy) return false;
        if (amount === 'all') amount = economy.bank;
        if (!economy.bank || economy.bank < amount) return false;
        economy.cash += amount;
        economy.bank -= amount;
        economy.save();
        return true;
    }

    public static async daily(userId: string, guildId: string) {
        let economy = await Economy.findOne({ userId, guildId });
        if (!economy) economy = await new Economy({ userId, guildId });

        const amount = Math.round(Math.random() * 10) + 5;
        const lastDaily = economy.daily.lastDaily?.toDateString();
        const currentDaily = new Date().toDateString();

        if (lastDaily === currentDaily) return false;

        economy.daily.lastDaily = new Date();
        economy.cash += amount;
        economy.save();
        return amount;
    }

    public static async levelUp(
        userId: string,
        guildId: string,
        amount: number
    ) {
        let economy = await Economy.findOne({ userId, guildId });
        if (!economy) economy = await new Economy({ userId, guildId });

        economy.cash += amount;
        return true;
    }
}
