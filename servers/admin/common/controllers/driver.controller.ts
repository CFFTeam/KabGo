import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response, Router } from 'express';

import driverModel, { Driver } from '../models/driver.model';
import Controller from '@common/interfaces/controller';
import { BadRequestException } from '@common/utils/exceptions';

class DriverController implements Controller {
    path: string = '/v1/driver';
    router: Router = Router();

    constructor() {
        this.router.get('/', this.getDriver);
        this.router.post('/create-account', this.createAccount);
        this.router.post('/lock-account', this.lockAccount);
    }

    private getDriver = async (req: Request, res: Response, next: NextFunction) => {
        const allDriver = await driverModel.find().sort();
        console.log(allDriver);
        res.json({ success: true, status: 200, data: allDriver });
    };

    private createAccount = async (req: Request, res: Response, next: NextFunction) => {
        const getEmailExist = await driverModel.findOne({ email: req.body.email });
        console.log(getEmailExist);
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
            };
            await driverModel.create(createAccountData);
            res.json({
                success: true,
                status: 200,
                message: 'Tạo tài khoản thành công',
            });
        }
    };

    private lockAccount = async (req: Request, res: Response, next: NextFunction) => {
        const getAccountManipulate = await driverModel.findOne({_id: req.query.id});
        await driverModel.updateOne({ _id: req.query.id }, { lock: !getAccountManipulate!.lock });
        res.json({
            success: true,
            status: 200,
        });
    };
}

export default DriverController;

