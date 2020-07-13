export default abstract class {
    private _params: string[] = [];
    protected abstract _name: string;

    get params(): string[] {
        return this._params;
    }

    get name(): string {
        return this._name;
    }

    constructor() { }

    abstract exec(params: string[]): void;
};
