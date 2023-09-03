import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response, Router } from 'express';

import customerModel, { Customer } from '../models/customer.model';
import Controller from '@common/interfaces/controller';
import { BadRequestException } from '@common/utils/exceptions';

class CustomerController implements Controller {
    path: string = '/v1/customer';
    router: Router = Router();

    constructor() {
        this.router.get('/', this.getCustomer);
        this.router.post('/create-account', this.createAccount);
        this.router.post('/create-new', this.createAccount);
        this.router.post('/lock-account', this.lockAccount);
    }

    private getCustomer = async (req: Request, res: Response, next: NextFunction) => {
        const allCustomer = await customerModel.find();
        res.json({ success: true, status: 200, data: allCustomer });
    };

    private createAccount = async (req: Request, res: Response, next: NextFunction) => {
        const getEmailExist = await customerModel.findOne({ email: req.body.email });
        if (getEmailExist !== null) {
            res.json({
                success: false,
                status: 200,
                message: 'Email đã tồn tại',
            });
        } else {
            const createAccountData = {
                name: req.body.name,
                email: req.body.email,
                phonenumber: req.body.phone,
                // vehicle: obj
            };
            await customerModel.create(createAccountData);
            res.json({
                success: true,
                status: 200,
                message: 'Tạo tài khoản thành công',
            });
        }
    };

    private lockAccount = async (req: Request, res: Response, next: NextFunction) => {
        const getAccountManipulate = await customerModel.findOne({_id: req.query.id});
        await customerModel.updateOne({ _id: req.query.id }, { lock: !getAccountManipulate!.lock });
        res.json({
            success: true,
            status: 200,
        });
    };
}

export default CustomerController;

