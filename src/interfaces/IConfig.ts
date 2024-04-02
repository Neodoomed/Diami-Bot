export interface IConfig {
    token: string;
    devToken: string;
    prefix: string;

    clientId: string;
    devClientId: string;

    guildId: string;
    devGuildId: string;

    mongoUrl: string;
    mongoUser: string;
    mongoPassword: string;
    mongoDb: string;
    devMongoDb: string;
}
