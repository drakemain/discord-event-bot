import { Message} from 'discord.js';

import Command from './command';
import { getCommandPrefix } from '../command-parser';
import commandList from '../command-list';

export default class extends Command {
    _name = 'help';
    _description = 'Displays this message.';
    _detail = '\`help [command]\` to get more information on a specific command.';

    exec(params: string[], message: Message) {
        let helpMsg = '';

        if (params.length > 0) {
            const command = commandList.find(cmd => cmd.name === params[0]);
            
            if (command) {
                helpMsg += command.detail;
            } else {
                helpMsg += `\"${params[0]}\" is not a command.`;
            }
        } else {
            helpMsg = `Issue commands with \`${getCommandPrefix()} [command] [options]\`\n`
            
            helpMsg += `\tValid commands are:\n\`\`\``

            for (const validCommand of commandList) {
                helpMsg += `\t${validCommand.name}\t${validCommand.description}\n`;
            }

            helpMsg += `\`\`\``
        }

        message.channel.send(helpMsg);
    }
};
