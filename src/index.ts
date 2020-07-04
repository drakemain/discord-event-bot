import Discord, { MessageEmbed } from 'discord.js';
import Dotenv from 'dotenv';

import { parseCommandMessage, setCommandPrefix } from './command-parser';
import { execCommand, init as initStateMachine} from './state-machine';

Dotenv.config();

const client = new Discord.Client();

client.on('ready', () => {
    if (process.env.COMMAND_PREFIX) {
        setCommandPrefix(process.env.COMMAND_PREFIX);
    }

    initStateMachine();

    console.log('Ready.');
});

client.on('message', message => {
    const command = parseCommandMessage(message);

    if (command !== null) {
        if (!execCommand(command)) {
            console.log(`Command was not valid: ${command}`);
        }
    }
});

client.login(process.env.BOT_ID);
