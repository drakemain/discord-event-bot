import Command from './commands/command';
import Create from './commands/create';
import Help from './commands/help';
import Delete from './commands/delete';
import Rtd from './commands/rtd';

const commandList: Command[] = [
    new Help(),
    new Create(),
    new Delete(),
    new Rtd(),
];

export default commandList;
