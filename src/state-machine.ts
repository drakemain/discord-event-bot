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
            ['cmd', testFunc2]
        ]);
    }
};

let stack: State[] = [
    new BaseState()
];

const execCommand = (command: string) => {
    stack[stack.length - 1].execCommand(command);
};

export { 
    execCommand
};
