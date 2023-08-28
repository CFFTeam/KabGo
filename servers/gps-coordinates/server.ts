import Application from '@common/app';
import UserController from '@common/controllers/user.controller';
import Driver from '@common/interfaces/driver';
import DriverSubmit from '@common/interfaces/driver_submit';
import User from '@common/interfaces/user';
import socket from '@common/socket';
import haversineDistance from '@common/utils/haversineDistance';
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

const driverList: any = {};
const customerList: any = {};

const server = app.run(4600, () => {
    socket.init(server);
    socket.getIO().on('connection', (socket: any) => {
        socket.on('join', (message: string) => {
            const driver = JSON.parse(message) as Driver;
            const _id = driver.phonenumber;

            socket.phonenumber = _id;

            driverList[_id] = {
                socket: socket,
                infor: driver,
            };
            console.log(driverList);
        });

        socket.on('booking-car', (message: string) => {
            const customer = JSON.parse(message) as User;
            const _id = customer.user_information.phonenumber;

            customerList[_id] = {
                infor: customer,
                socket: socket,
            };

            let drivers: any = [];

            for (const id in driverList) {
                const distance = haversineDistance(
                    {
                        latitude: +customer.departure_information.latitude,
                        longitude: +customer.departure_information.longitude,
                    },
                    {
                        latitude: driverList[id].infor.coordinate.latitude,
                        longitude: driverList[id].infor.coordinate.longitude,
                    }
                );
                if (distance <= 1.5) {
                    driverList[id].infor.distance = distance;
                    drivers = [...drivers, driverList[id]];
                }
            }

            const nearestDriver = drivers?.sort((a: any, b: any) => b.distance - a.distance).slice(0, 5);

            const finalDrivers = nearestDriver.map((el: any) => {
                el.socket.emit('customer-request', JSON.stringify(customer));
                delete el.socket;

                return el;
            });

            socket.emit('send drivers', JSON.stringify(finalDrivers));
        });

        socket.on('driver-accept', (message: string) => {
            const driverSubmit = JSON.parse(message) as DriverSubmit;

            const id = driverSubmit.user_id;

            customerList[id].socket.emit('submit driver', JSON.stringify(driverSubmit.driver));
        });

        socket.on('driver-moving', (message: string) => {
            const driverSubmit = JSON.parse(message) as DriverSubmit;

            const id = driverSubmit.user_id;

            customerList[id]?.socket.emit('moving driver', JSON.stringify(driverSubmit.driver));
        });

        socket.on('disconnection', () => {
            const id = socket.phonenumber;

            delete driverList[id];

            console.log('Client disconnected');
        });
    });
});

// process.on('unhandledRejection', (err: Error) => {
//     console.error('Unhandled Rejection. Shutting down...');
//     console.error(err.name, err.message, err.stack);

//     setTimeout(() => {
//         io.disconnectSockets();
//         io.close();

//         server.close(() => {
//             process.exit(1); // 0 is success, 1 is uncaught exception
//         });
//     }, 3000);
// });

