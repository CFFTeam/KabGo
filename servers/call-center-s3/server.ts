import Application from '@common/app';
import UserController from '@common/controllers/user.controller';
import rabbitmq from '@common/rabbitmq';
import dotenv from 'dotenv';
import SocketManager from '@common/socket';
import { Socket } from 'socket.io';
const accountSid = 'AC2aa9972a3be5eec764feaa72b01825a8';
const authToken = 'c160385ab9b17d41673427ae4f698725';
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

const server = app.run(4502, async () => {
    const io = SocketManager.init(server);

    io.on('connection', (socket: Socket) => {
        console.log('Socket connected successfully`');
    });

    await rabbitmq.consume('tracking', (message: string) => {
        const data = JSON.parse(message);
        let messageSend;
        console.log('---------------------');
        console.log('Queue get from s3: ', data);
        if (message !== null) {
            io.emit('Tracking Queue', message);
            if (data.state === 'Đang điều phối') {
                messageSend = 'Vui lòng chờ giây lát, chúng tôi đang điều phối chuyến xe cho tài xế gần nhất.';
            }
            if (data.state === 'Đang tiến hành'){
                messageSend = `Đã tìm được tài xế. Tài xế sẽ đến đón bạn trong ít phút. Thông tin tài xế: ${data.driver_name}, Số điện thoại: ${data.driver_phonenumber}, Phương tiện: ${data.vehicle_name} (${data.vehicle_color}), Biển số xe: ${data.vehicle_number}.`;
            }
            if (data.state === 'Hoàn thành') {
                messageSend = 'Chuyến đi đã hoàn thành. Cám ơn bạn đã sử dụng dịch vụ của chúng tôi.';
            }
            if (data.state === 'Đã hủy') {
                messageSend = 'Chuyến đi đã bị hủy. Xin lỗi bạn vì sự bất tiện này.';
            }
            console.log(messageSend);
            // client.messages
            // .create({
            //     body: messageSend,
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

