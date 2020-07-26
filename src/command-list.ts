import Command from './commands/command';
import Create from './commands/create';
import Help from './commands/help';
import Delete from './commands/delete';

const commandList: Command[] = [
    new Help(),
    new Create(),
    new Delete(),
];

export default commandList;
