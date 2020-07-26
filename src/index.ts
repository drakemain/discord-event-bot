import Discord, { MessageEmbed } from 'discord.js';
import Dotenv from 'dotenv';

import  * as CommandParser from './command-parser';
import Command from './commands/command';
import commandList from './command-list';
import { speak } from './message';

Dotenv.config();

let commands: Map<string, Command> = new Map();

for (const cmd of commandList) {
    commands.set(cmd.name, cmd);
}

const client = new Discord.Client();

client.on('ready', () => {
    if (process.env.COMMAND_PREFIX) {
        CommandParser.setCommandPrefix(process.env.COMMAND_PREFIX);
    }

    console.log('Ready.');
});

client.on('message', message => {
    if (CommandParser.parseCommandMessage(message)) {
        const commandStr = CommandParser.getCommand();
        const params = CommandParser.getParams();

        const command = commands.get(commandStr);

        if (command) {
            try{
                command.exec(params, message);
            } catch(e) {
                console.error(`Failed to run command: ${e.message}`);
                message.channel.send(`Error: ${e.message}`);
            }
        }
    }
});

client.login(process.env.BOT_ID);
