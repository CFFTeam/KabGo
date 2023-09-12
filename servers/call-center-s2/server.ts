import Application from '@common/app';
import UserController from '@common/controllers/example.controller';
import rabbitMQ from '@common/rabbitmq';
import dotenv from 'dotenv';
import SocketManager from '@common/socket';
import { Socket } from 'socket.io';
import mongoose from 'mongoose';
import BookingHistory from '@common/models/booking_history.model';
import Customer from '@common/models/customer.model';
import Service from '@common/models/service.model';

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
            console.log('Queue get from s2: ', JSON.parse(message));
            if (message !== null) {
                io.emit('locating', message);
            }
        });
        socket.on('gps-coordinates', async (data) => {
            // find customer, if not exist -> create new one
            let customer = await Customer.findOne({ phonenumber: data.customer_phonenumber });
            if (!customer) {
                customer = await Customer.create({
                    name: data.customer_name,
                    email: '',
                    phonenumber: data.customer_phonenumber,
                    dob: '',
                    home_address: '',
                    type: 'STANDARD',
                    default_payment_method: '',
                    rank: 'Đồng',
                    active: '07/09/2023',
                    lock: 'false',
                });
            }
            // find existed booking history, if exists -> increase the frequency. If not, create new one
            let existedBooking = await BookingHistory.find({
                $and: [{ 'original.address': data.origin }, { 'destination.address': data.destination }],
            });

            // find corresponding vehicle_id of vehicle type
            const service = await Service.findOne({ name: data.vehicle_type });
            
            let newBooking = await BookingHistory.create({
                _id: new mongoose.Types.ObjectId(data._id),
                customer: customer._id,
                original: {
                    address: data.origin,
                    latitude: data.origin_latlng.lat,
                    longitude: data.origin_latlng.lng,
                },
                destination: {
                    address: data.destination,
                    latitude: data.destination_latlng.lat,
                    longitude: data.destination_latlng.lng,
                },
                distance: data.distance,
                duration: data.duration,
                time: data.local_time,
                state: 'Đang điều phối',
                frequency: existedBooking.length + 1,
                vehicle: service?._id,
                price: data.price,
                related_employee: new mongoose.Types.ObjectId(data.related_employee),
            });
            console.log('Data sent from client-s2: ', data);

            rabbitMQ.publish(
                'gps-coordinates',
                JSON.stringify({
                    _id: newBooking._id,
                    ...data,
                    state: 'Đang điều phối',
                })
            );

            rabbitMQ.publish(
                'tracking',
                JSON.stringify({
                    _id: newBooking._id,
                    ...data,
                    state: 'Đang điều phối',
                    // state: "Đang tiến hành"
                    // state: "Hoàn thành"
                    // state: "Đã hủy"
                })
            );
        });
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

