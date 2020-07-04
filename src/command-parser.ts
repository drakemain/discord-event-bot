import { Message } from "discord.js";

let commandPrefix = '!EventBot';
//const prefix: string|undefined = process.env.COMMAND_PREFIX;

const parseCommandMessage = (inputMessage: Message): string | null => {
    let result: string | null = null;
    let content = inputMessage.content;

    if (commandPrefix 
            && (content.length > commandPrefix.length)
            && (content.substr(0, commandPrefix.length) == commandPrefix)
            && (content.charAt(commandPrefix.length) === ' ')) {


        const command = content.substr(commandPrefix.length + 1).trim();
        result = command;
    }

    return result;
};

const setCommandPrefix = (prefix: string) => {
    if (prefix.length > 0) {
        commandPrefix = prefix;

        console.log(`Commands issued with '${commandPrefix} [command]'`);
    }
};

export { 
    parseCommandMessage,
    setCommandPrefix
};
