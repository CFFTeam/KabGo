import { NextFunction, Request, Response, Router } from 'express';
import Controller from '@common/interfaces/controller';

class UserController implements Controller {
    path: string = '/v1/admin';
    router: Router = Router();

    constructor() {
        this.router.get('/', this.login)
        this.router.get('/logout', this.logout);
        this.router.get('/get-data', this.getData);

    }

    private login = (req: Request, res: Response, next: NextFunction) => {
        
        next();
    };

    private logout = (req: Request, res: Response, next: NextFunction) => {
        next();
    };

    private getData = (req: Request, res: Response, next: NextFunction) => {
        console.log('aaaaaaaaa');
    };
}

export default UserController;
