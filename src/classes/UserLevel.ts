import CustomClient from './CustomClient';

export default class UserSystem {
    client: CustomClient;
    user: string;
    level: number = 0;
    requireXp = this.level * this.level * 20 + 20;

    constructor(client: CustomClient) {
        this.client = client;
        this.user = '';
    }

    userId(id: string) {
        this.user = id;
    }

    lvlUp() {}

    lvlDown() {}

    addExp() {}

    removeExp() {}
}
