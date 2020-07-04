import State from './state';

const testFunc = () => {
    console.log('TEST');
}

const testFunc2 = () => {
    console.log('i am cmd');
}

class BaseState extends State {
    constructor() {
        super();

        this.functionMap = new Map([
            ['test', testFunc],
            ['cmd', testFunc2],
            ['kill', () => {console.log('KILL');this._isComplete = true}],
            ['add', () => {console.log('ADD'); requestNewState(new BaseState())}]
        ]);
    }

    execCommand

    init() {
        console.log('Base State Init!');
    }

    resume() {
        console.log('Resume Base State!');
    }

    pause() {
        console.log('Pausing Base State!');
    }

    cleanup() {
        console.log('Cleanup Base State!');
    }
};

let stack: State[] = [
    new BaseState(),
    new BaseState()
];

let insertionQueue: State[] = [];

const execCommand = (command: string): boolean => {
    let state = getTopState();
    let validCommand = state.execCommand(command);

    if (state.isComplete) {
        state.cleanup();
        stack.pop();
        getTopState().resume();
        console.log(stack.length);
    }

    while (insertionQueue.length !== 0) {
        state.pause();
        state = insertionQueue.shift();
        state.init();
        stack.push(state);
        console.log(stack.length);
    }

    return validCommand;
};

const getTopState = (): State => {
    return stack[stack.length - 1];
}

const requestNewState = (state: State) => {
    insertionQueue.push(state);
}

export { 
    execCommand
};
