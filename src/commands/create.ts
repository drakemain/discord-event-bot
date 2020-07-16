import { Message } from 'discord.js';

import Command from './command';
import Event from '../event';
import { addEvent } from '../event-manager';

const parseTitle = (params: string[]): string => {
    let startIndex = -1;
    let endIndex = -1;
    let result: string = '';

    for (let i = 0; i < params.length; ++i) {
        const param = params[i];
        if (startIndex < 0 && param.charAt(0) === '"') {
            startIndex = i;
        }

        if (startIndex >= 0 && param.charAt(param.length - 1) == '"') {
            endIndex = i;
        }
    }

    if (endIndex >= 0) {
        for (let i = startIndex; i <= endIndex; ++i) {
            if (i === startIndex) {
                result += params[i].substr(1);
            } else if (i === endIndex) {
                result += params[i].substr(0, params[i].length - 1);
            } else {
                result += params[i];
            }

            if (i < endIndex) {
                result += ' ';
            }
        }
    }

    return result;
};

export default class extends Command {
    _name = 'create';
    _description = 'Creates a new event.'

    exec(params: string[], message: Message) {
        if (params.length >= 1) {
            const title = parseTitle(params);

            if (title === '') {
                console.log('Cannot parse title');
                return;
            }
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
