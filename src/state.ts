import { requestNewState, requestKillState } from './state-machine';
import Command from './command';

abstract class State {
    constructor() {
        this.functionMap = new Map();
        this.commandList = new Map();
    }

    execCommand = (commandMessage: string): boolean => {
        let success = false;
        const command = new Command(commandMessage, this.commandList);

        console.log(command.command, command.argumentList);

        if (command.isValid && this.functionMap.has(command.command)) {
            success = true;
            const func = this.functionMap.get(command.command) as () => void;
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

    /* TODO: Too much redundancy. Condense these */
    protected functionMap: Map<string, () => void>;
    protected commandList: Map<string, number> = new Map();
};

export { State };
