import DriverRegisterDto from '@common/dtos/driverRegister.dto';
import Controller from '@common/interfaces/controller';
import validationMiddleware from '@common/middlerware/validation.middleware';
import Driver from '@common/models/driver.model';
import { Request, Response, NextFunction, Router } from 'express';

export default class DriverController implements Controller {
    path: string = '/v1/driver';
    router: Router = Router();

    constructor() {
        this.router.post('/register', validationMiddleware(DriverRegisterDto), this.register);
    }

    private register = async (req: Request, res: Response, next: NextFunction) => { 
        const driver: DriverRegisterDto = req.body;
        
        const driverExist = await Driver.findOne({ email: driver.email });
        
        if (driverExist == null) {
            const newDriver = await Driver.create(driver);
            return res.status(200).json(newDriver);
        }

        return res.status(200).json(driverExist);
    }
}