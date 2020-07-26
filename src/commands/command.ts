import { Message } from 'discord.js';

export default abstract class {
    private _params: string[] = [];
    protected abstract _name: string;
    protected abstract _description: string;
    protected abstract _detail: string;

    get params(): string[] {
        return this._params;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get detail(): string {
        return this._detail;
    }

    constructor() { }

    abstract exec(params: string[], message: Message): void;
};
