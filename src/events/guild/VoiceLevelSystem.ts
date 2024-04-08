import { Events, VoiceState } from 'discord.js';
import CustomClient from '../../classes/CustomClient';
import Event from '../../classes/Event';
import VoiceChannel from '../../schemas/VoiceChannel';
import UserLevel from '../../schemas/UserLevel';

export default class VoiceLevelSystem extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.VoiceStateUpdate,
            description: 'VoiceLevelSystem',
            once: false,
        });
    }

    async Execute(oldState: VoiceState, newState: VoiceState) {
        const member = oldState.member || newState.member;
        const guild = oldState.guild || newState.guild;
        if (!member) return;
        const guildID = guild.id;
        const memberID = member.id;

        let data = await VoiceChannel.findOne({
            guildId: `${guildID}`,
            userId: `${memberID}`,
        });
        if (!data)
            data = await VoiceChannel.create({
                guildId: guildID,
                userId: memberID,
            });

        let dataLevel = await UserLevel.findOne({
            guildId: `${guildID}`,
            userId: `${memberID}`,
        });
        if (!dataLevel)
            dataLevel = await UserLevel.create({
                guildId: guildID,
                userId: memberID,
            });

        if (!oldState.channel && newState.channel) {
            data.startTime = Date.now();
            data.online = true;
            data.save();
        } else if (oldState.channel && !newState.channel) {
            //data.startTime = new Date().getTime();

            const elapsedTime = Date.now() - data.startTime;
            const minutos = elapsedTime / 60000;
            if (minutos < 5) return;
            const give = Math.round(minutos / 5);

            let gain = 0;
            for (let i = 0; i < give; i++) {
                gain += Math.round(Math.random() * 3);
            }

            data.totalTime += elapsedTime;
            data.online = false;
            data.save();
        }
    }
}
