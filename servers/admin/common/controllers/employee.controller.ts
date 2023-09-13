import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response, Router } from 'express';

import employeeModel, { Employee } from '../models/employee.model';
import Controller from '@common/interfaces/controller';
import { BadRequestException } from '@common/utils/exceptions';

class EmployeeController implements Controller {
    path: string = '/v1/employee';
    router: Router = Router();

    constructor() {
        this.router.get('/', this.getEmployee);
        this.router.post('/create-account', this.createAccount);
        this.router.post('/lock-account', this.lockAccount);
    }

    private getEmployee = async (req: Request, res: Response, next: NextFunction) => {
        const allEmployee = await employeeModel.find().sort();
        res.json({ success: true, status: 200, data: allEmployee });
    };

    private createAccount = async (req: Request, res: Response, next: NextFunction) => {
        const getEmailExist = await employeeModel.findOne({ email: req.body.email });
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
                phoneNumber: req.body.phone,
                dob: '10/10/2002',
                address: req.body.address,
                role: req.body.role,
                gender: req.body.gender,
            };
            await employeeModel.create(createAccountData);
            res.json({
                success: true,
                status: 200,
                message: 'Tạo tài khoản thành công',
            });
        }
    };

    private lockAccount = async (req: Request, res: Response, next: NextFunction) => {
        const getAccountManipulate = await employeeModel.findOne({_id: req.query.id});
        await employeeModel.updateOne({ _id: req.query.id }, { lock: !getAccountManipulate!.lock });
        res.json({
            success: true,
            status: 200,
        });
    };
}

export default EmployeeController;

