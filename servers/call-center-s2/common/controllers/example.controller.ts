import { NextFunction, Request, Response, Router } from 'express';
import Controller from '@common/interfaces/controller';

class UserController implements Controller {
    path: string = '/user';
    router: Router = Router();

    constructor() {
        this.router.get('/login', (req, res, next) => {
            res.send('Login page');
            next();
        });
    }

    private login = (req: Request, res: Response, next: NextFunction) => {
        next();
    };
}

export default UserController;
