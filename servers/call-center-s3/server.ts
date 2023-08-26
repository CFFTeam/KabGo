import Application from '@common/app';
import UserController from '@common/controllers/user.controller';
import rabbitmq from '@common/rabbitmq';
import dotenv from 'dotenv';
import SocketManager from '@common/socket';
import { Socket } from 'socket.io';

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
        console.log('Queue get from s3: ', JSON.parse(message));
        if (message !== null) {
            io.emit('Tracking Queue', message);
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

