import Event from './event';
import { setTimeout } from 'timers';

let events: Map<string, Event> = new Map();

const createEvent = (title: string, time: Date): boolean => {
    return addEvent(new Event(title, time));
};

const addEvent = (event: Event): boolean => {
    if (!events.has(event.title)) {
        events.set(event.title, event);
        console.log(`Created ${event.title} for ${event.time}`);

        remindInMs(event.title, 5000);

        return true;
    }

    return false;
};

const deleteEvent = (title: string): boolean => {
    const event = events.get(title);

    if (event) {
        event.destroy();
        events.delete(title);
        return true;
    }

    return false;
};

const printEvent = (title: string) => {
    const event = events.get(title);

    if (event) {
        // do something
        return true;
    }

    return false;
};

const remindInMs = (eventTitle: string, msUntilReminder: number): boolean => {
    const event = events.get(eventTitle);

    if ((msUntilReminder > 0) && event) {
        const timer = setTimeout(() => {
            console.log(`REMINDER: ${event.title}`);
        }, msUntilReminder);

        event.addReminder(timer);

        return true;
    }

    return false;
};

export {
    createEvent,
    addEvent,
    deleteEvent
};
