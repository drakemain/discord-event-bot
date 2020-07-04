import { requestNewState, requestKillState } from './state-machine';

abstract class State {
    constructor() {
        this.functionMap = new Map();
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

    static kill = () => {
        requestKillState();
    }

    static addState = (state: State) => {
        requestNewState(state);
    }

    abstract init(): void;
    abstract resume(): void;
    abstract pause(): void;
    abstract cleanup(): void;

    protected functionMap: Map<string, () => void>;
};

export { State };
