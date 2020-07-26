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
            let titleWord = params[i];
            console.log(titleWord);

            // remove leading quote
            if (i === startIndex) {
                titleWord = titleWord.substr(1);
            } 

            // remove tailing quote
            if (i === endIndex) {
                titleWord = titleWord.substr(0, params[i].length - 2);
            } 

            console.log(titleWord);
            result += titleWord;

            if (i < endIndex) {
                result += ' ';
            }
        }
    }

    if (result === '') {
        throw new Error('Unrecognized or missing title.')
    }

    return result;
};

const findTimeParam = (params: string[]): string => {
    const timeRegex = new RegExp('^([0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')

    for (const param of params) {
        if (timeRegex.test(param)) {
            return param;
        }
    }

    throw new Error('Unrecognized or missing time.');
};

const findDateParam = (params: string[]): string => {
    const dateRegex = new RegExp('^((0?[1-9]|1[012])[- \/.](0?[1-9]|[12][0-9]|3[01])[- \/.](19|20)?[0-9]{2})*$')

    for (const param of params) {
        if (dateRegex.test(param)) {
            return param;
        }
    }

    throw new Error('Unrecognized or missing date.');
}

const getDateOfEvent = (time: string, date: string): Date => {
    const result = new Date();
    const timeParams = time.split(':');
    let dateParams: string[] = [];

    if (date.includes('/')) {
        dateParams = date.split('/');
    } else if (date.includes('.')) {
        dateParams = date.split('.');
    } else if (date.includes('-')) {
        dateParams = date.split('.');
    } 
    
    result.setHours(Number(timeParams[0]));
    result.setMinutes(Number(timeParams[1]));
    result.setMonth(Number(dateParams[0]) - 1);
    result.setDate(Number(dateParams[1]));
    result.setFullYear(Number('20' + dateParams[2]));
    result.setSeconds(0);

    if (result.valueOf() < Date.now()) {
        throw new Error('Date has already passed!');
    }

    return result;
};

export default class extends Command {
    _name = 'create';
    _description = 'Creates a new event.'
    _detail = '\`create \"[title]\" [hh:mm] [mm/dd/yy] [@users]\`';

    exec(params: string[], message: Message) {
        const title = parseTitle(params);
        const timeStr = findTimeParam(params);
        const dateStr = findDateParam(params);
        const time = getDateOfEvent(timeStr, dateStr);

        if (time) {
            const event = new Event(title, time, message);

            event.attendees.add(message.author);

            message.mentions.users.forEach(user => {
                event.addAttendee(user);
            });

            addEvent(event);
        }
    }
}
