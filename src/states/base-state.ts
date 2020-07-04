import { State } from '../state';
import BaseState from './base-state';

const addState = () => {
    State.addState(new BaseState());
};

export default class extends State {
    constructor() {
        super();
        this.functionMap.set('add', addState);
        this.functionMap.set('rm', State.kill);
    }

    init() {
        console.log('Base State Init');
    }

    resume() {
        console.log('Base State Resume');
    }

    pause() {
        console.log('Base State Pause');
    }

    cleanup() {
        console.log('Base State Cleanup');
    }
}
