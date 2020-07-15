import Command from './command';
import { getCommandPrefix } from '../command-parser';
import commandList from '../command-list';

export default class extends Command {
    _name = 'help';
    _description = 'Displays this message.';

    exec(params: string[]) {
        console.log(`Issue commands with \`${getCommandPrefix()} [command] [options]\``);
        console.log(`Valid commands are: `);

        for (const validCommand of commandList) {
            console.log(`\t${validCommand.name}\t${validCommand.description}`);
        }
    }
};
