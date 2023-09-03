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
        this.router.post('/create-new', this.createAccount);
        this.router.post('/lock-account', this.lockAccount);
    }

    private getDriver = async (req: Request, res: Response, next: NextFunction) => {
        const allDriver = await driverModel.find().populate('vehicle.service');
        res.json({ success: true, status: 200, data: allDriver });
    };

    private createAccount = async (req: Request, res: Response, next: NextFunction) => {
        const getEmailExist = await driverModel.findOne({ email: req.body.email });
        if (getEmailExist !== null) {
            res.json({
                success: false,
                status: 200,
                message: 'Email đã tồn tại',
            });
        } else {
            // const obj = [{
            //     name: "Wave Alpha 50cc",
            //     brand: "Honda",
            //     type: "Xe máy",
            //     color: "Đỏ",
            //     number: "51H49283"
            // },
            // {
            //     name: "Wave Alpha 50cc",
            //     brand: "Honda",
            //     type: "Xe máy",
            //     color: "Đỏ",
            //     number: "51H49283"
            // }];
            // console.log(obj);
            const createAccountData = {
                name: req.body.name,
                email: req.body.email,
                phonenumber: req.body.phone,
                // vehicle: obj
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

