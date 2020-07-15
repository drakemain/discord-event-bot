import { Message } from 'discord.js';

export default abstract class {
    private _params: string[] = [];
    protected abstract _name: string;
    protected abstract _description: string;

    get params(): string[] {
        return this._params;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    constructor() { }

    abstract exec(params: string[], message: Message): void;
};
