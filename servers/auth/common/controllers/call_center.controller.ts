import { NextFunction, Request, Response, Router } from 'express';
import Controller from '@common/interfaces/controller';
import validationMiddleware from '@common/middlerware/validation.middleware';
import JsonWebToken from '@common/utils/jwt';
import catchAsync from '@common/utils/catchAsync';
import AppError from '@common/utils/appError';
import {promisify} from 'util';
import CallCenterLoginDto from '@common/dtos/callCenterLogin.dto';
import CallCenterRegisterDto from '@common/dtos/callCenterRegister.dto';
import Employee from '@common/models/employee.model';
import { SignOptions } from 'jsonwebtoken';

/*
    AUTH CONTROLLER
    1. login
    2. register
    3. forgot password
    4. reset password
*/

const jwt = new JsonWebToken(process.env.JWT_SECRET);

class authController implements Controller {
    path: string = '/v1/call-center';
    router: Router = Router();

    constructor() {
        this.router.post('/login', validationMiddleware(CallCenterLoginDto), this.login);
        this.router.post('/register', validationMiddleware(CallCenterRegisterDto), this.register);
    }

    /// > LOGIN
    private login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // get phone number, password of user
        const {email, password} = req.body as CallCenterLoginDto;
        
        let employee = await Employee.findOne({ email: email }).select('+password');
        if (!employee || !(await employee.correctPassword(password, employee.password)) || !employee.active) {
            return next(new AppError('Tài khoản hoặc mật khẩu không chính xác', 401));
        }

        const accessToken = jwt.createToken({_id: employee._id.toString()}, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        })

        // Remove the 'password' field from the employee object
        const employee_info = employee.toObject() as any;
        delete employee_info.password;

        return res.status(200).json({
            status: 'success',
            message: "Đăng nhập thành công",
            data: {
                employee_info: employee_info,
                access_token: accessToken
            }
        })
    });

    /// > REGISTER
    private register = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
        console.log('register caught data:', req.body);
        // get phone number, password, password confirm from client 
        // const {name, email, dob, address, role, gender, phone_number, password, 
        //     password_confirm} = req.body as CallCenterRegisterDto;
        // validate the password
        const userRegistrationDto = req.body as CallCenterRegisterDto;
        console.log('user registration: ', userRegistrationDto);

        const newEmployee = await Employee.create({
            name: req.body.name || '',
            email: req.body.email || '',
            password: req.body.password || '',
            passwordConfirm: req.body.password_confirm || '',
            phoneNumber: req.body.phone_number || '',
            dob: req.body.dob || '',
            address: req.body.address || '',
            role: req.body.role || '',
            gender: req.body.gender || ''
          });

        
        // create json web token
           const accessToken = await jwt.createToken({_id: newEmployee._id.toString()}, {
            expiresIn: process.env.JWT_EXPIRES_IN as string,
            } as SignOptions)
        // status code 201: request has succeeded and has led to the creation of a resource
        return res.status(201).json({
            status: 'success',
            message: "Tạo tài khoản thành công",
            data: {
                employee_info: newEmployee,
                access_token: accessToken
            }
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
