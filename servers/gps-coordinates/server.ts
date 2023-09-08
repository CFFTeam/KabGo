import { CallCenterRequest } from './common/interfaces/call_center_request';
import Application from '@common/app';
import UserController from '@common/controllers/user.controller';
import Driver from '@common/interfaces/driver';
import DriverSubmit from '@common/interfaces/driver_submit';
import User from '@common/interfaces/user';
import rabbitmq from '@common/rabbitmq';
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
    rabbitMQConnection: {
        uri: process.env.RABBITMQ_URI as string,
    },
});

const driverList: any = {};
const customerList: any = {};
const stateDriver: any = {};

const server = app.run(4600, async () => {
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
            console.log(_service?.id);
            const controllers = new UserController();
            controllers.createBooking({
                customer: new mongoose.Types.ObjectId('64e741543ce0d32a53a60469'),
                driver: new mongoose.Types.ObjectId('64f0d7a7357ef17371d71b3a'),
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
                el.socket.emit('customer-request', JSON.stringify(customer));
                delete el.socket;

                return el;
            });

            socket.emit('send drivers', JSON.stringify(finalDrivers));
        });

        socket.on('driver-accept', async (message: string) => {
            const driverSubmit = JSON.parse(message) as DriverSubmit;

            const id = driverSubmit.user_id;

            stateDriver[id].state = 'Đang tiến hành';
            stateDriver[id].driver_name = driverSubmit.driver.name;
            stateDriver[id].driver_phonenumber = driverSubmit.driver.phonenumber;
            stateDriver[id].vehicle_number = driverSubmit.driver.vehicle.number;
            stateDriver[id].vehicle_name = driverSubmit.driver.vehicle.name;
            stateDriver[id].vehicle_color = driverSubmit.driver.vehicle.color;

            await rabbitmq.publish('tracking', JSON.stringify(stateDriver[id]));
            
            customerList[id]?.socket.emit('submit driver', JSON.stringify(driverSubmit.driver));
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

    await rabbitmq.consume('gps-coordinates', (message: string) => {
        console.log(message);

        const request = JSON.parse(message) as CallCenterRequest;                                                   

        let drivers: any = [];

        for (const id in driverList) {
            const distance = haversineDistance(
                {
                    latitude: +request.origin_latlng.lat,
                    longitude: +request.origin_latlng.lng,
                },
                {
                    latitude: driverList[id].infor.coordinate.latitude,
                    longitude: driverList[id].infor.coordinate.longitude,
                }
            );

            if (distance <= 1.5) {
                driverList[id].infor.distance = distance;
                drivers = [...drivers, { ...driverList[id] }];
            }
        }

        const nearestDriver = drivers?.sort((a: any, b: any) => b.distance - a.distance).slice(0, 5);

        const customer: User = {
            user_information: {
                avatar: 'https://www.slotcharter.net/wp-content/uploads/2020/02/no-avatar.png',
                name: request.customer_name,
                email: 'no email',
                phonenumber: request.customer_phonenumber,
                dob: '',
                home_address: '',
                type: 'STANDARD',
                default_payment_method: 'Tiền mặt',
                rank: 'Đồng',
            },
            departure_information: {
                address: request.origin,
                latitude: `${request.origin_latlng.lat}`,
                longitude: `${request.origin_latlng.lng}`,
            },
            arrival_information: {
                address: request.destination,
                latitude: `${request.destination_latlng.lat}`,
                longitude: `${request.destination_latlng.lng}`,
            },
            service: request.vehicle_type,
            price: '160.000đ',
            distance: '36.5km',
            time: '35 phút',
        }

        stateDriver[request.customer_phonenumber] = {...request};

        nearestDriver.map((el: any) => {
            el.socket.emit('customer-request', JSON.stringify(customer));
            delete el.socket;

            return el;
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

