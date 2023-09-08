import Application from '@common/app';
import UserController from '@common/controllers/user.controller';
import Driver from '@common/interfaces/driver';
import DriverSubmit from '@common/interfaces/driver_submit';
import User from '@common/interfaces/user';
import customerModel from '@common/models/customer.model';
import serviceModel from '@common/models/service.model';
import socket from '@common/socket';
import haversineDistance from '@common/utils/haversineDistance';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
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

        socket.on('booking-car', async (message: string) => {
            const customer = JSON.parse(message) as User;
            const _id = customer.user_information.phonenumber;

            customerList[_id] = {
                infor: customer,
                socket: socket,
            };
            console.log(customer);

            const _service = await serviceModel.findOne({ name: customer.service });
            const _customer = await customerModel.findOne({ email: customer.user_information.email });
            console.log(_service?.id);
            const controllers = new UserController();
            const bookingData = controllers.createBooking({
                customer: _customer?.id,
                // driver: '',
                // related_employee: new mongoose.Types.ObjectId('64e99fffdb83ce30945a0f4d'),
                original: {
                    address: customer.departure_information.address,
                    longitude: customer.departure_information.longitude,
                    latitude: customer.departure_information.latitude,
                },
                destination: {
                    address: customer.arrival_information.address,
                    longitude: customer.arrival_information.longitude,
                    latitude: customer.arrival_information.latitude,
                },
                time: new Date().toISOString(),
                status: 'điều phối', //điều phối | tiến hành | hủy | hoàn thành
                frequency: '1',
                price: customer.price,
                vehicle: _service?.id,
                note: '',
                // coupon: new mongoose.Types.ObjectId('64e73b79646803068e5c21f7'),
            });

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
                console.log(distance);
                if (distance <= 1.5) {
                    driverList[id].infor.distance = distance;
                    drivers = [...drivers, { ...driverList[id] }];
                }
            }

            const nearestDriver = drivers?.sort((a: any, b: any) => b.distance - a.distance).slice(0, 5);

            const finalDrivers = nearestDriver.map((el: any) => {
                el.socket.emit('customer-request', JSON.stringify({ customer: customer, 'booking-data': bookingData }));
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

            customerList[id]?.socket.emit('moving driver', JSON.stringify(driverSubmit));
        });

        socket.on('driver-comming', (message: string) => {
            const driverSubmit = JSON.parse(message) as DriverSubmit;
            const id = driverSubmit.user_id;
            customerList[id]?.socket.emit('comming driver', JSON.stringify(driverSubmit.driver));
        });

        socket.on('disconnect', () => {
            delete driverList[socket.phonenumber];

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

