import { User, TextChannel, Message } from 'discord.js';

export default class {
    private _title: string;
    private _attendees: Map<string, User>;
    private _reminders: NodeJS.Timeout[] = [];
    private _responseChannel: TextChannel;
    time: Date;

    get title(): string {
        return this._title;
    }

    get attendees(): Map<string, User> {
        return this._attendees;
    }

    get responseChannel(): TextChannel {
        return this._responseChannel;
    }

    constructor(title: string, time: Date, message: Message) {
        this._title = title;
        this.time = time;
        this._attendees = new Map();
        this._responseChannel = message.channel as TextChannel;

        this.addAttendee(message.author);
        this.addAttendees(message.mentions.users.array());
    }

    addAttendees(attendees: User[]) {
        for (const attendee of attendees) {
            this.addAttendee(attendee);
        }
    }

    addAttendee(attendee: User) {
        console.log('test');
        if (!this._attendees.has(attendee.valueOf())) {
            this._attendees.set(attendee.valueOf(), attendee);
        }
    }

    addReminder(timerId: NodeJS.Timeout) {
        this._reminders.push(timerId);
    }

    removeAttendee(attendee: User) {
        this.attendees.delete(attendee.valueOf());
    }

    destroy() {
        console.log(`Destroying ${this.title}`);
        this._reminders.forEach(reminder => {
            clearTimeout(reminder);
        });
    }

    toString() {
        let str = `${this.title}:\n`;
        
        this.attendees.forEach(attendee => {
            str += `\t${attendee.toString()}\n`
        });

        str += `on ${this.time.getMonth() + 1}/${this.time.getDate()} `;
        str += `at ${this.time.getHours()}:${this.time.getMinutes()}`;

        return str;
    }
}
