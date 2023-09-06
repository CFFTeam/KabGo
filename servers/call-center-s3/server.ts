import Application from '@common/app';
import UserController from '@common/controllers/user.controller';
import rabbitmq from '@common/rabbitmq';
import dotenv from 'dotenv';
import SocketManager from '@common/socket';
import { Socket } from 'socket.io';
const accountSid = 'AC2aa9972a3be5eec764feaa72b01825a8';
const authToken = '5e81b08ffb7f29096bad9f457149a972';
const client = require('twilio')(accountSid, authToken);

process.on('uncaughtException', (err: Error) => {
    console.error('Uncaught Exception. Shutting down...');
    console.error(err.name, err.message, err.stack);

    setTimeout(() => {
        process.exit(1);
    }, 3000);
});

dotenv.config({ path: './.env.local' });

const app = new Application({
    controllers: [new UserController()],
    mongoConnection: {
        uri: process.env.MONGO_URI as string,
    },
    rabbitMQConnection: {
        uri: process.env.RABBITMQ_URI as string,
    },
});

// const data = await rabbitmq.consume('locating', (message: string) => {
//     console.log('ki vay huhu');
//     console.log('Queue get from s2: ', JSON.parse(message));
//     if (message !== null) {
//         io.emit('queue bang socket ne', message);
//     }

// })

// const server = app.run(4502, () => {
//     rabbitmq.consume('test', (message) => {
//         console.log(message);
//     });
// });

const server = app.run(4502, async ()=>{
    const io = SocketManager.init(server);

    io.on('connection', (socket: Socket) => {
        console.log('Socket connected successfully`');
    });

    await rabbitmq.consume('test', (message: string) => {
        // const data = JSON.parse(message);
        console.log('---------------------');
        console.log('Queue get from s3: ', message);
        if (message !== null) {
            io.emit('Tracking Queue', message);
            // client.messages
            // .create({
            //     body: message,
            //     from: '+14259545906',
            //     to: '+84888821312'
            // })
            // .then((message:any) => console.log(message.sid))
        }
    });
});

process.on('unhandledRejection', (err: Error) => {
    console.error('Unhandled Rejection. Shutting down...');
    console.error(err.name, err.message, err.stack);

    setTimeout(() => {
        server.close(() => {
            process.exit(1); // 0 is success, 1 is uncaught exception
        });
    }, 3000);
});

