import { Message } from 'discord.js';

import Command from './command';
import Event from '../event';
import { addEvent } from '../event-manager';

export default class extends Command {
    _name = 'create';
    _description = 'Creates a new event.'

    exec(params: string[], message: Message) {
        if (params.length >= 1) {
            const title = params[0];
            let time = new Date();
            time.setSeconds(time.getSeconds() + 7);

            const event = new Event(title, time, message);

            message.mentions.users.forEach(user => {
                event.addAttendee(user);
            });

            addEvent(event);
        }
    }
}
