import Application from '@common/app';
import UserController from '@common/controllers/example.controller';
import rabbitMQ from '@common/rabbitmq';
import dotenv from 'dotenv';
import SocketManager from '@common/socket';
import {Socket} from 'socket.io';

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

const server = app.run(4501, async () => {
   // crate socket to handle events (2-way communication with client-call-center) (init after server starts)
    const io = SocketManager.init(server);
    io.on('connection', async (socket: Socket) => {
        console.log('Socket initialized successfully');
        const data = await rabbitMQ.consume('locating', (message: string) => {
            console.log('ki vay huhu');
            console.log('Queue get from s2: ', JSON.parse(message));
            if (message !== null) {
                io.emit('locating', message);
            }
        })
        socket.on('gps-coordinates', (data) => {
            console.log('gps_information sent from client call-center-s2: ', data);  
            rabbitMQ.publish('gps-coordinates', JSON.stringify(data)); 
            rabbitMQ.publish('tracking', JSON.stringify({
                ...data,
                status: "Đang điều phối"
                // status: "Đang tiến hành"
                // status: "Hoàn thành"
                // status: "Đã hủy"
            }))
        })
    })

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
