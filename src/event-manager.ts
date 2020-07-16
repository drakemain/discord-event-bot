import Event from './event';
import { setTimeout } from 'timers';
import { speak } from './message';

let events: Map<string, Event> = new Map();

const addEvent = (event: Event): boolean => {
    if (!events.has(event.title)) {
        events.set(event.title, event);
        console.log(`Created ${event.title} for ${event.time.toUTCString()}`);
        const reminderMs = event.time.valueOf() - Date.now();

        remindInMs(event.title, reminderMs, () => {
            deleteEvent(event.title);
        });

        return true;
    }

    return false;
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

const printEvent = (title: string) => {
    const event = events.get(title);

    if (event) {
        // do something
        return true;
    }

    return false;
};

const remindInMs = (eventTitle: string, msUntilReminder: number
    , callback?: () => void): boolean => {
    const event = events.get(eventTitle);

    if ((msUntilReminder > 0) && event) {
        const timer = setTimeout(() => {
            speak(`REMINDER: ${event.title}`, event.responseChannel);
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
    //createEvent,
    addEvent,
    deleteEvent
};
