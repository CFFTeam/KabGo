import { NextFunction, Request, Response, Router } from 'express';
import Controller from '@common/interfaces/controller';
import validationMiddleware from '@common/middlerware/validation.middleware';
import JsonWebToken from '@common/utils/jwt';
import catchAsync from '@common/utils/catchAsync';
import AppError from '@common/utils/appError';
import { promisify } from 'util';
import customerModel from '@common/models/customer.model';
import bookingHistory from '@common/models/booking_history.model';

/*
    AUTH CONTROLLER
    1. login
    2. register
    3. forgot password
    4. reset password
*/

const jwt = new JsonWebToken(process.env.JWT_SECRET);

class customerAuthController implements Controller {
    path: string = '/v1/customer-auth';
    router: Router = Router();

    constructor() {
        this.router.post('/login', this.login);
        this.router.post('/get-booking-history', this.getBookingHistory);
    }

    /// > LOGIN
    private login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // get phone number, password of user
        const customer = await customerModel.findOne({ email: req.body.email });
        if (customer != null) {
            return res.status(200).json({
                status: 'success',
                info: JSON.stringify(customer),
                // accessToken: accessToken,
            });
        } else {
            customerModel.create({
                name: req.body.name,
                email: req.body.email,
                phonenumber: '0976975548',
            });
            return res.status(200).json({
                status: 'success',
                info: JSON.stringify({
                    name: req.body.name,
                    email: req.body.email,
                    phonenumber: '0976975548',
                }),
            });
        }
    });

    public getBookingHistory = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        const customer = await customerModel.findOne({ email: req.body.email });
        console.log(customer);
        const historyList = await bookingHistory.find({ customer: customer?._id.toString() }).sort('-_id');

        const _historyList: any = [];
        for (const i in historyList) {
            let check: boolean = true;
            for (const j in _historyList) {
                if (historyList[i].destination.address === _historyList[j].destination.address) check = false;
            }
            if (check) _historyList.push(historyList[i]);
        }
        console.log(_historyList);

        return res.status(200).json({
            status: 'success',
            history: _historyList,
            // accessToken: accessToken,
        });
    };
}

export default customerAuthController;

