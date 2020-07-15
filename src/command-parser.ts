import { Message } from "discord.js";

let commandPrefix = '!EventBot';
let parsedCommand: string;
let parsedParams: string[];
let valid = false;

const getCommandPrefix = () => {
    return commandPrefix;
};

const parseCommandMessage = (inputMessage: Message): boolean => {
    valid = false;
    let content = inputMessage.content;

    if (commandPrefix 
            && (content.length > commandPrefix.length)
            && (content.substr(0, commandPrefix.length) == commandPrefix)
            && (content.charAt(commandPrefix.length) === ' ')) {


        const commandElements = content
            .substr(commandPrefix.length)
            .trim()
            .split(' ');

        if (commandElements.length > 0) {
            parsedCommand = commandElements.shift() as string;
            parsedParams = commandElements;
            valid = true;
        }
    }

    return valid;
};

const isValid = () => {
    return valid;
}

const getCommand = (): string => {
    return parsedCommand;
}

const getParams = (): string[] => {
    return parsedParams;
}

const setCommandPrefix = (prefix: string) => {
    if (prefix.length > 0) {
        commandPrefix = prefix;

        console.log(`Commands issued with '${commandPrefix} [command]'`);
    }
};

export { 
    parseCommandMessage,
    isValid,
    getCommand,
    getParams,
    setCommandPrefix,
    getCommandPrefix
};
