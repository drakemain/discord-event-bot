export default abstract class {
    _isComplete: boolean = false;

    get isComplete(): boolean {
        return this._isComplete;
    }

    execCommand = (command: string): boolean => {
        let success = false;

        if (this.functionMap.has(command)) {
            success = true;
            const func = this.functionMap.get(command) as () => void;
            func();
        }

        return success;
    }

    abstract init(): void;
    abstract resume(): void;
    abstract pause(): void;
    abstract cleanup(): void;

    abstract functionMap: Map<string, () => void>;
};
