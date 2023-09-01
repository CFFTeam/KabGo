import Application from '@common/app';
import EmployeeController from '@common/controllers/employee.controller';
import UserController from '@common/controllers/user.controller';
import dotenv from 'dotenv';

process.on('uncaughtException', (err: Error) => {
    console.error('Uncaught Exception. Shutting down...');
    console.error(err.name, err.message, err.stack);

    setTimeout(() => { 
        process.exit(1);
    }, 3000);
});

dotenv.config({ path: './.env.local' });

const app = new Application({
    controllers: [new EmployeeController()],
    mongoConnection: {
        uri: process.env.MONGO_URI as string,
    },
});

const server = app.run(4400);

process.on('unhandledRejection', (err: Error) => {
    console.error('Unhandled Rejection. Shutting down...');
    console.error(err.name, err.message, err.stack);
    
    setTimeout(() => { 
        server.close(() => {
            process.exit(1); // 0 is success, 1 is uncaught exception
        });
    }, 3000);
});
