import { State } from './state';
import BaseState from './states/base-state';

let stack: State[] = [];
let insertionQueue: State[] = [];
let statesToPop = 0;

const execCommand = (command: string): boolean => {
    let state = getTopState();
    let validCommand = state.execCommand(command);

    while (statesToPop) {
        if (stack.length > 1) {
            state.cleanup();
            stack.pop();
            getTopState().resume();
            --statesToPop;
        } else {
            statesToPop = 0;
        }

        console.log(stack.length, statesToPop);
    }

    while (insertionQueue.length !== 0) {
        state.pause();
        state = insertionQueue.shift() as State;
        state.init();
        stack.push(state);
        console.log(state, stack.length);
    }

    if (stack.length === 0) {
        init();
    }

    return validCommand;
};

const getTopState = (): State => {
    return stack[stack.length - 1];
};

const requestNewState = (state: State) => {
    insertionQueue.push(state);
};

const requestKillState = (num = 1) => {
    statesToPop = num;
};

const init = () => {
    const base = new BaseState();
    stack.push(base);
    base.init();
};

export { 
    init,
    execCommand,
    requestNewState,
    requestKillState
};
