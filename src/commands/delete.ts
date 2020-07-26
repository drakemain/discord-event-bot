import Command from './command';
import { deleteEvent } from '../event-manager';

export default class extends Command {
    _name = 'create';
    _description = 'Deletes an event.';

    exec(params: string[]) {
        if (params.length >= 1) {
            let title: string = '';
            let readingTitle = false;

            for (const param of params) {
                if (!readingTitle) {
                    if (param.charAt(0) == "\"") {
                        param.substr(1);
                        readingTitle = true;
                    }
                }

                if (readingTitle) {
                    if (param.charAt(param.length - 1) == "\"") {
                        //param.subs
                    }
                    title += param;
                }
            }

            deleteEvent(title);
        }
    }
}
