import chalk from 'chalk';
import Logger from './logger';

class ConsoleProxyHandler implements ProxyHandler<Console> {
    private originalConsole: Console;

    constructor() {
        this.originalConsole = console;
    }

    public get(target: Console, prop: keyof Console): any {
        if (prop === 'log') {
            return (...args: any[]) => {
                const timestamp = new Date().toUTCString();
                const modifiedArgs = [
                    chalk.blue(`[${process.env.APP_NAME}]${chalk.yellow(
                        `[${timestamp}]`
                    )}`),
                    ...args,
                ];

                const message = [`[${process.env.APP_NAME}][${timestamp}]`, ...args, '\r\n'].join(' ');
                new Logger('./logs/activity.log').log(message);

                target.log.apply(this.originalConsole, modifiedArgs);
            };
        } else if (prop === 'error') {
            return (...args: any[]) => {
                const timestamp = new Date().toUTCString();
                const modifiedArgs = [chalk.blue(`[${process.env.APP_NAME}]${chalk.yellow(
                    `[${timestamp}]`
                )}`), chalk.red(...args)];

                const message = [`[${process.env.APP_NAME}][${timestamp}]`, ...args, '\r\n'].join(' ');
                new Logger('./logs/error.log').log(message);

                target.log.apply(this.originalConsole, modifiedArgs);
            };
        }

        return Reflect.get(target, prop);
    }
}

export default ConsoleProxyHandler;
