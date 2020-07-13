import Command from './command';

export default class extends Command {
    _name = 'test';

    constructor() {
        super();
    }
    
    exec(params: string[]) { 
        console.log('I am a test');
        console.log(params);
    }
};
