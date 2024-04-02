import { Events } from "discord.js";

export default interface IEvent {
    name: Events;
    description: string;
    once: boolean;
}