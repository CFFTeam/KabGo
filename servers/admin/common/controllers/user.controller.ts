import { NextFunction, Request, Response, Router } from 'express';
import Controller from '@common/interfaces/controller';

class UserController implements Controller {
    path: string = '/user';
    router: Router = Router();

    constructor() {
        this.router.get('/login', this.login)
        this.router.get('/logout', this.logout);
    }

    private login = (req: Request, res: Response, next: NextFunction) => {
        next();
    };

    private logout = (req: Request, res: Response, next: NextFunction) => {
        next();
    };
}

export default UserController;
