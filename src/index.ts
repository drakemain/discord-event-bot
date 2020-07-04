import Discord, { MessageEmbed } from 'discord.js';
import Dotenv from 'dotenv';

import { parseCommandMessage, setCommandPrefix } from './command-parser';

Dotenv.config();

const client = new Discord.Client();

client.on('ready', () => {
    if (process.env.COMMAND_PREFIX) {
        setCommandPrefix(process.env.COMMAND_PREFIX);
    }

    console.log('Ready.');
});

client.on('message', message => {
    const command = parseCommandMessage(message);

    if (command !== null) {
        message.channel.send(command);
    }
});

client.login(process.env.BOT_ID);
