import { User } from 'discord.js';

export default class {
    private _title: string;
    private _attendees: Set<User>;
    private _reminders: NodeJS.Timeout[] = [];
    time: Date;

    get title(): string {
        return this._title;
    }

    get attendees(): Set<User> {
        return this._attendees;
    }

    constructor(title: string, time: Date) {
        this._title = title;
        this.time = time;
        this._attendees = new Set();
    }

    addAttendees(attendees: User[]) {
        for (const attendee of attendees) {
            this._attendees.add(attendee);
        }
    }

    addReminder(timerId: NodeJS.Timeout) {
        this._reminders.push(timerId);
    }

    addAttendee(attendee: User) {
        this._attendees.add(attendee);
    }

    removeAttendee(attendee: User) {
        this.attendees.delete(attendee);
    }

    destroy() {
        this._reminders.forEach(reminder => {
            clearTimeout(reminder);
        });
    }
}
