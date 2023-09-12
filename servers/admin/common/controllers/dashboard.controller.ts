import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response, Router } from 'express';

import customerModel, { Customer } from '../models/customer.model';
import driverModel, { Driver } from '../models/driver.model';
import bookingHistoryModel, { IBookingHistory } from '../models/booking_history.model';
import Controller from '@common/interfaces/controller';
import { BadRequestException } from '@common/utils/exceptions';

class DashboardController implements Controller {
    path: string = '/v1/dashboard';
    router: Router = Router();

    constructor() {
        this.router.get('/', this.getInitData);
    }

    private getInitData = async (req: Request, res: Response, next: NextFunction) => {
        const allCustomers = await customerModel.find();
        const allDrivers = await driverModel.find();
        const allBookingHistories = await bookingHistoryModel.find();
        res.json({ success: true, status: 200, data: {allCustomers, allDrivers, allBookingHistories} });
    };
}

export default DashboardController;

