export default abstract class {
    execCommand = (command: string): boolean => {
        let success = false;

        if (this.functionMap.has(command)) {
            success = true;
            const func = this.functionMap.get(command) as () => void;
            func();
        }

        return success;
    }

    abstract functionMap: Map<string, () => void>;
};
