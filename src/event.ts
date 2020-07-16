import { User, TextChannel, Message } from 'discord.js';

export default class {
    private _title: string;
    private _attendees: Set<User>;
    private _reminders: NodeJS.Timeout[] = [];
    private _responseChannel: TextChannel;
    time: Date;

    get title(): string {
        return this._title;
    }

    get attendees(): Set<User> {
        return this._attendees;
    }

    get responseChannel(): TextChannel {
        return this._responseChannel;
    }

    constructor(title: string, time: Date, message: Message) {
        this._title = title;
        this.time = time;
        this._attendees = new Set();
        this._responseChannel = message.channel as TextChannel;
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
        console.log(`Destroying ${this.title}`);
        this._reminders.forEach(reminder => {
            clearTimeout(reminder);
        });
    }
}
