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

const server = app.run(4600);

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket: Socket) => { 

    console.log('Client connected');

    const customerRequest = {
        customer: {
            name: 'Maximilliam',
            phone: '0123456789',
            avatar: 'lib/assets/test/avatar.png',
            rankType: 'gold',
            rankTitle: 'Hạng vàng'
        },
        booking: {
            from: {
                latitude: 10.739409785339353,
                longitude: 106.65454734297383
            },
            to: {
                latitude: 10.762711311339077,
                longitude: 106.68230473890691
            },
            paymentMethod: 'ZaloPay',
            promotion: false,
            vehicle: 'Xe Oto con'
        }
    };

    setTimeout(() => socket.emit('welcome', JSON.stringify(customerRequest)), 3000);
    
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
