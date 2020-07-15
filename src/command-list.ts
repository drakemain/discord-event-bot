import Command from './commands/command';
import Create from './commands/create';
import Help from './commands/help';

const commandList: Command[] = [
    new Help(),
    new Create(),
];

export default commandList;
