import Event from './event';
import { User } from 'discord.js';
import { setTimeout } from 'timers';
import { speak } from './message';

let events: Map<string, Event> = new Map();

const addEvent = (event: Event) => {
    if (!events.has(event.title)) {
        events.set(event.title, event);
        console.log(`Created ${event.title} for ${event.time.toUTCString()}`);
        const reminderMs = event.time.valueOf() - Date.now();
        const hourBeforeReminderMs = (event.time.valueOf() - (1000*60*60)) - Date.now();

        remindInMs(event.title, reminderMs, () => {
            deleteEvent(event.title);
        });

        remindInMs(event.title, hourBeforeReminderMs);
    } else {
        throw new Error(`Event with title ${event.title} already exists! Titles must be unique.`);
    }
};

const deleteEvent = (title: string): boolean => {
    const event = events.get(title);

    if (event) {
        event.destroy();
        events.delete(title);
        console.log(`${title} deleted.`);
        return true;
    }

    return false;
};

const getEventList = () => {
    //const event = events.get(title);

    if (event) {
        // do something
        return true;
    }

    return false;
};

const getEvent = (title: string): Event | undefined => {
    return events.get(title);
};

const remindInMs = (eventTitle: string, msUntilReminder: number
    , callback?: () => void): boolean => {
    const event = events.get(eventTitle);

    if ((msUntilReminder > 0) && event) {
        let msg = `REMINDER: \"${event.title}\" is at ${event.time}.`;
        
        event.attendees.forEach(attendee => {
            msg += `\t${attendee.toString()}\n`;
        });

        const timer = setTimeout(() => {
            speak(msg, event.responseChannel);
            if (callback) {
                callback();
            }
        }, msUntilReminder);

        event.addReminder(timer);

        return true;
    }

    return false;
};

export {
    addEvent,
    deleteEvent,
    getEvent
};
