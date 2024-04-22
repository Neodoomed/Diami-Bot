import { EmbedBuilder, Events, Guild } from 'discord.js';
import { CronJob } from 'cron';
import CustomClient from '../../classes/CustomClient';
import Event from '../../classes/Event';
import FelizJueves from '../../schemas/FelizJueves';

export default class Jueves extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.ClientReady,
            description: 'Feliz Jueves',
            once: false,
        });
    }

    async Execute() {
        //const guild = await FelizJueves.findOne({
        //    guildId: `${}`,
        //});

        //if (!guild?.channels.suggestion) return;
        const job = new CronJob(
            '0 0 9 * * 4',
            () => {
                // Canal donde se enviará el mensaje (puedes cambiarlo al canal que desees)
                //this.client.
                const channel =
                    this.client.channels?.fetch('774727090188320814'); // Reemplaza 'ID_DEL_CANAL' por el ID del canal

                // Mensaje a enviar
                //@ts-ignore
                channel?.send({
                    content:
                        '# Feliz jueves!\n https://media.discordapp.net/attachments/1003047615409176627/1231796275926798457/FelizJueves.png?ex=663842ad&is=6625cdad&hm=16c8eac9cdca93c264f44da70c0437fe9e1e2234efa527a12786a059ba2a6054&=&format=webp&quality=lossless&width=957&height=702',
                });
            },
            null, // onComplete
            true, // start
            'America/Los_Angeles'
        );

        // Iniciar el cron job
        job.start();
    }
}
