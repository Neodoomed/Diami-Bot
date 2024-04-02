import ILogger from '../interfaces/ILogger';

// enum LogLevel {
//     Error,
//     Debug,
//     Info,
//     Warning,
//     Mongo,
// }
enum LogLevel {
    Error = '\x1b[31m[ERROR]\x1b[0m',
    Debug = '\x1b[32m[DEBUG]\x1b[0m',
    Info = '\x1b[34m[INFO]\x1b[0m',
    Warning = '\x1b[33m[WARNING]\x1b[0m',
    Mongo = '\x1b[36m[MONGO]\x1b[0m',
}

export default class Logger implements ILogger {
    private logFilePath: string;
    constructor(logFilePath: string) {
        this.logFilePath = logFilePath;
    }

    private log(level: LogLevel, message: string): void {
        // const formattedMessage = `${new Date().toISOString().slice(0, 19).replace('T', ' ')} ${LogLevel[level].toUpperCase()}\t ${message}`;
        const formattedMessage = `${new Date().toISOString().slice(0, 19).replace('T', ' ')} ${level}\t ${message}`;
        console.log(formattedMessage);
        // this.writeToFile(formattedMessage);
    }

    private writeToFile(message: string): void {}

    private sendToChannel(message: string): void {}

    error(message: string): void {
        this.log(LogLevel.Error, message);
    }

    debug(message: string): void {
        this.log(LogLevel.Debug, message);
    }

    info(message: string): void {
        this.log(LogLevel.Info, message);
    }

    warning(message: string): void {
        this.log(LogLevel.Warning, message);
    }

    mongo(message: string): void {
        this.log(LogLevel.Mongo, message);
    }
}
