import { Message } from 'discord.js';

import Command from './command';
import { deleteEvent, getEvent } from '../event-manager';

export default class extends Command {
    _name = 'delete';
    _description = 'Deletes an event.';
    _detail = '\`delete [title]\`';

    exec(params: string[], message: Message) {
        params.forEach(title => {
            const event = getEvent(title);

            if (event) {
                const attendees = event.attendees.values();
                
                if (deleteEvent(title)) {
                    let responseMsg = `Event ${title} deleted.\n`;

                    for (const attendee of attendees) {
                        responseMsg += `\t${attendee.toString()}\n`;
                    }

                    message.channel.send(responseMsg);
                }
            }
        });
    }
}
