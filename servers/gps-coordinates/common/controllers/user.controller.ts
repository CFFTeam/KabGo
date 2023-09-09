import { NextFunction, Request, Response, Router } from 'express';
import Controller from '@common/interfaces/controller';
import bookingHistoryModel from '../models/booking_history.model';

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
    }

    private login = (req: Request, res: Response, next: NextFunction) => {
        next();
    };

    public createBooking = async (createBookingData: any) => {
        return await bookingHistoryModel.create(createBookingData);
    };
}

export default UserController;

