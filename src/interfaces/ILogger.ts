export default interface ILogger {
    error(message: string): void;
    debug(message: string): void;
    info(message: string): void;
    warning(message: string): void;
    mongo(message: string): void;
}
