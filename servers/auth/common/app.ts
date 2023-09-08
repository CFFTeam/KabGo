import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import chalk from 'chalk';
import { Server } from 'http';
import Controller from './interfaces/controller';
import ConsoleProxyHandler from '@common/utils/console.proxy';
import Logger from './utils/logger';
import globalErrorHandler from "@common/controllers/error.controller";

type ApplicationOptions = {
    controllers: Controller[];
    mongoConnection: MongoConnection;
};

type MongoConnection = {
    uri: string;
    options?: mongoose.ConnectOptions;
};

class Application {
    private app: express.Application;
    private controllers: Controller[] = [];
    private mongoConnection: MongoConnection;

    constructor(options: ApplicationOptions) {
        this.app = express();
        this.controllers = options.controllers;
        this.mongoConnection = options.mongoConnection;

        console = new Proxy(console, new ConsoleProxyHandler());

        this.setup();
        this.mongoDBConnect(this.mongoConnection.uri, this.mongoConnection.options);
    }

    public application() {
        return this.app;
    }

    private setup() {
        console.log('Setting up request middleware...');

        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use(
            morgan(
                `${chalk.blue(
                    `[${process.env.APP_NAME}]`
                )}${chalk.yellow('[:date]')} ${chalk.green(
                    ':method'
                )} ${chalk.cyan(':status')} ${chalk.white(':url')} :res[content-length] - :response-time ms`
            )
        );

        // Use the CORS middleware here
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', 'http://call-center.kabgo.local');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });

        this.app.use(morgan(`[${process.env.APP_NAME}][:date] :method :status :url :res[content-length] - :response-time ms`, {
            stream: new Logger('./logs/access.log').createWritableStream(),
        }));
        
        this.controllers.forEach((controller) => this.app.use(controller.path, controller.router));

        this.app.get('/status', (req, res) => {
            return res.json({ status: '200 - OK', message: 'Server is running ...' });
        });
        
        this.app.use(globalErrorHandler);
    }

    public mongoDBConnect(uri: string, options: mongoose.ConnectOptions = {}): void {
        mongoose
            .connect(uri, options)
            .then(() => {
                console.log('Connected to database successfully');
            })
            .catch((error) => {
                console.log('Could not connect to the database', error);
            });
    }

    public run(port: number = 3000, callback: Function = () => {}): Server {
        console.log('Server is starting...');

        const availablePort = process.env.PORT ?? port;

        return this.app.listen(availablePort, () => {
            console.log(`Server is running on port ${availablePort}`);

            callback();
        });
    }
}

export default Application;

