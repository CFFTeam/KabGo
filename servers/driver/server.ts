import Application from '@common/app';
import UserController from '@common/controllers/user.controller';
import dotenv from 'dotenv';
import { Server, Socket } from 'socket.io';

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
});

const server = app.run(4200);

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket: Socket) => { 

    console.log('Client connected');

    setTimeout(() => socket.emit('welcome', 'Welcome to the server'), 3000);
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

process.on('unhandledRejection', (err: Error) => {
    console.error('Unhandled Rejection. Shutting down...');
    console.error(err.name, err.message, err.stack);
    
    setTimeout(() => { 
        io.disconnectSockets();
        io.close();

        server.close(() => {
            process.exit(1); // 0 is success, 1 is uncaught exception
        });
    }, 3000);
});
