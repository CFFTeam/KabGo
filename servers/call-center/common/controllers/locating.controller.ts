import { NextFunction, Request, Response, Router } from 'express';
import Controller from '@common/interfaces/controller';
import validationMiddleware from '@common/middlerware/validation.middleware';
import CallReceiptDto from '@common/dtos/call_receipt.dto';
import rabbitMQ from '@common/rabbitmq';
import mongoose from 'mongoose';

class LocatingController implements Controller {
    path: string = '/v1/locating';
    router: Router = Router();

    constructor() {
        this.router.post('/call-receipt', validationMiddleware(CallReceiptDto), this.callReceipt);
    }

    callReceipt = (req: Request, res: Response, next: NextFunction) => {
        const data = {
        _id: new mongoose.Types.ObjectId(),
        ...req.body as CallReceiptDto,
        };
        console.log(typeof data);
        console.log('data from client-s1: ', data);
        res.status(200).json({
            status: 'success',
            data
        })  

        rabbitMQ.publish('locating', JSON.stringify(data));
    }
   
}

export default LocatingController;
