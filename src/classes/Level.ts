import UserLevel from '../schemas/UserLevel';
import CustomClient from './CustomClient';

export default class Level {
    guildId: string;
    userId: string;
    LevelMultiplier: number = 20;

    constructor(userId: string, guildId: string) {
        this.guildId = guildId;
        this.userId = userId;
    }

    public async getLevel(): Promise<number> {
        let data = await UserLevel.findOne({
            guildId: `${this.guildId}`,
            userId: `${this.userId}`,
        });

        if (!data) return -1;
        return data.level;
    }

    public async getLevelXp(): Promise<number> {
        let data = await UserLevel.findOne({
            guildId: `${this.guildId}`,
            userId: `${this.userId}`,
        });

        if (!data) return -1;
        const oldLevelExp =
            (data.level - 1) * (data.level - 1) * this.LevelMultiplier +
            this.LevelMultiplier;
        return data.exp - oldLevelExp;
    }

    public async getTotalXp(): Promise<number> {
        let data = await UserLevel.findOne({
            guildId: `${this.guildId}`,
            userId: `${this.userId}`,
        });

        if (!data) return -1;
        return data.exp;
    }

    public async getExpRequired(): Promise<number> {
        let data = await UserLevel.findOne({
            guildId: `${this.guildId}`,
            userId: `${this.userId}`,
        });
        if (!data) return -1;
        return (
            data.level * data.level * this.LevelMultiplier +
            this.LevelMultiplier
        );
    }

    public async addExp(give: number): Promise<number> {
        let data = await UserLevel.findOne({
            guildId: `${this.guildId}`,
            userId: `${this.userId}`,
        });

        if (!data)
            data = await UserLevel.create({
                guildId: this.guildId,
                userId: this.userId,
            });

        const requireXp =
            data.level * data.level * this.LevelMultiplier +
            this.LevelMultiplier;
        //const give = Math.round(Math.random() * 3);
        data.exp += give;
        if (data.exp >= requireXp) {
            data.level += 1;
            await data.save();
            return data.level;
        } else {
            await data.save();
            return 0;
        }
    }

    public async removeExp(remove: number) {
        let data = await UserLevel.findOne({
            guildId: `${this.guildId}`,
            userId: `${this.userId}`,
        });

        if (!data)
            data = await UserLevel.create({
                guildId: this.guildId,
                userId: this.userId,
            });

        const levelDownExp =
            (data.level - 1) * (data.level - 1) * this.LevelMultiplier +
            this.LevelMultiplier;
        data.exp -= remove;

        if (data.exp <= levelDownExp) {
            data.level -= 1;
            await data.save();
            return data.level;
        } else {
            await data.save();
            return 0;
        }
    }
}
