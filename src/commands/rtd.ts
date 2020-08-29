import { Message, User} from 'discord.js';

import Command from './command';

export default class extends Command {
    _name = 'rtd';
    _description = 'Generates random numbers.';
    _detail = '';

    exec(params: string[], message: Message) {
        if (message.mentions.users.size > 0) {
            let challengers: User[] = [message.author];
            
            message.mentions.users.forEach((user) => {
                challengers.push(user);
            });

            message.channel.send(rtdChallenge(challengers));
        }
    }
};

//class RtdChallenge {
    //users: User[];
    //responsMsg: string = "";

    //constructor(users: User[]) {
        //this.users = users;
    //}

    //generateWinner() {
        //if (this.users.length > 1) {}
        //let response: string = "";
        //let tiedWinners: User[] = [];
        //let scores: number[] = [];
        //let winningScore: number;
        //const maxScore = 100;

        //for (const user of this.users) {
            //scores.push(generateRandomNumber(0, maxScore));
        //}

        //winningScore = scores.reduce((max, cur) => Math.max(max, cur));

        //for (let i = 0; i < this.users.length; ++i) {
            //if (scores[i] === winningScore) {
                //tiedWinners.push(this.users[i]);
            //}
        //}

        //return response;
    //}
//}

const generateRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * max + min);
};

const rtdChallenge = (users: User[]): string => {
    if (users.length === 1) { 
        return `${users[0]} Wins!`; 
    }

    let response: string = "";
    let tiedWinners: User[] = [];
    let scores: number[] = [];
    let winningScore: number = -Infinity;
    const maxScore = 6;

    for (const user of users) {
        const score = generateRandomNumber(0, maxScore);

        if (score > winningScore) {
            winningScore = score;
        }

        response += `${user}: ${score}\n`;

        scores.push(score);
    }

    for (let i = 0; i < users.length; ++i) {
        if (scores[i] === winningScore) {
            tiedWinners.push(users[i]);
        }
    }

    response += '\n' + rtdChallenge(tiedWinners);

    return response;
};
