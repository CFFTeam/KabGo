import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response, Router } from 'express';

import employeeModel, { Employee } from '../models/employee.model';
import Controller from '@common/interfaces/controller';
import { BadRequestException } from '@common/utils/exceptions';

class EmployeeController implements Controller {
    path: string = '/v1/admin';
    router: Router = Router();

    constructor() {
        this.router.get('/', this.getEmployee);
        this.router.get('/logout', this.logout);
        this.router.get('/get-data', this.getData);
    }

    private getEmployee = async (req: Request, res: Response, next: NextFunction) => {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
        const allEmployee = await employeeModel.find();
        res.json({ success: true, status: 200, data: allEmployee });
    };

    private logout = (req: Request, res: Response, next: NextFunction) => {
        next();
    };

    private getData = (req: Request, res: Response, next: NextFunction) => {
        console.log('aaaaaaaaa');
    };
}

export default EmployeeController;
