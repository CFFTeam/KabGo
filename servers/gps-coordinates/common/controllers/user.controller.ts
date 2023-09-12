import { NextFunction, Request, Response, Router } from 'express';
import Controller from '@common/interfaces/controller';
import bookingHistoryModel from '../models/booking_history.model';
import couponModel from '@common/models/coupon.model';

class UserController implements Controller {
    // path: string = '/user';
    path: string = '/v1/customer';
    router: Router = Router();

    constructor() {
        this.router.get('/login', (req, res, next) => {
            res.send('Login page');
            next();
        });
        this.router.post('/create_booking', this.createBooking);
        this.router.get('/get_coupon', this.getCoupon);
    }

    public createBooking = async (createBookingData: any) => {
        return await bookingHistoryModel.create(createBookingData);
    };

    public getCoupon = async (req: Request, res: Response, next: NextFunction) => {
        const couponList = await couponModel.find();
        const _couponList = couponList.slice(0, 10);
        return res.status(200).json({
            status: 'success',
            data: _couponList,
        });
    };
}

export default UserController;

