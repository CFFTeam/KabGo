import { NextFunction, Request, Response, Router } from 'express';
import Controller from '@common/interfaces/controller';
import validationMiddleware from '@common/middlerware/validation.middleware';
import UserLoginDto from '@common/dtos/userLogin.dto';
import JsonWebToken from '@common/utils/jwt';
import catchAsync from '@common/utils/catchAsync';
import AppError from '@common/utils/appError';
import {promisify} from 'util';
import UserRegistrationDto from '@common/dtos/userRegistration.dto';

/*
    AUTH CONTROLLER
    1. login
    2. register
    3. forgot password
    4. reset password
*/

const jwt = new JsonWebToken(process.env.JWT_SECRET);

class authController implements Controller {
    path: string = '/v1/auth';
    router: Router = Router();

    constructor() {
        this.router.post('/login', validationMiddleware(UserLoginDto), this.login);
        this.router.post('/register', validationMiddleware(UserRegistrationDto), this.register);
    }

    /// > LOGIN
    private login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // get phone number, password of user
        console.log('req.body.user: ', req.body);
        const {phone_number, password} = req.body as UserLoginDto;
        const accessToken = jwt.createToken({
            id: '123'
        },{
            expiresIn: process.env.JWT_EXPIRES_IN,
        })
        
        return res.status(200).json({
            status: 'success',
            data: 'your accounts has been authenticated successfully',
            accessToken: accessToken
        })
    });

    /// > REGISTER
    private register = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
        // get phone number, password, password confirm from client 
        const {phone_number, password, password_confirm} = req.body as UserRegistrationDto;
        // validate the password
        const userRegistrationDto = new UserRegistrationDto(phone_number, password, password_confirm);
        if (!userRegistrationDto.comparePasswords()) return next(new AppError('Password does not match. Try again!', 400));
        
        // return message
        return res.status(200).json({
            status: 'success',
            message: "Register successfully"
        })
    })
    
    /// > FORGOT PASSWORD
    private forgotPassword = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({
            status: 'success',
            message: "reset password successfully"
        })
    })

    /// > PROTECT
    private protect = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
        // 1) Getting token and check of it's there
        let token = '';
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
            token = req.headers.authorization.split('')[1];
        
        if (!token) {
            return next(new AppError('You are not logged in! Please log in to get access', 401));
        }

        // 2) Verification token
        const decoded = await promisify(jwt.verifyToken);


        // 3) Check if user still exists
        // const currentUser = await User.findById(decoded.id);
        // if (!currentUser) return next(new AppError('The user belonging to this token doest no longer exist.', 401));

        // 4) Check if user changed password after the token was issued
        // if (currentUser.changedPasswordAfter(decoded.iat))
        // return next(new AppError('User recently changed password! Please log in again.'), 401);

        // GRANT ACCESS TO PROTECT ROUTE
        // req.user = currentUser;
        // next();
    })

}

export default authController;
