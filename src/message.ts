import { TextChannel } from 'discord.js';

const speak = (message: string, channel: TextChannel) => {
    channel.send(message);
};

export {
    speak
};
