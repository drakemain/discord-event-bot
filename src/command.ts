export default class {
    private _command: string = '';
    private _argumentList: string[] = [];
    private _isValid = true;

    get command(): string {
        return this._command;
    }

    get argumentList(): string[] {
        return this._argumentList;
    }

    get isValid(): boolean {
        return this._isValid;
    }

    constructor(message: string,
        validCommands: Map<string, number>) {

        if (message.length === 0) {
            this._isValid = false;
            return;
        }

        const items = message.split(' ');
        this._command = items[0];
        
        if (items.length > 1) {
            this._argumentList = items.slice(1);
        }

        if (!validCommands.has(this.command)) {
            this._isValid = false;
            return;
        }

        const paramReqs = validCommands.get(this.command) as number;

        if (paramReqs !== this.argumentList.length) {
            this._isValid = false;
        }
    }
};
