import AppError from "@common/utils/appError";
import { NextFunction, Request, Response, Router } from 'express';
import { AppErrorInterface } from "@common/utils/appError";

class ErrorFactory {
  static createError(err: any) {
    switch (err?.name || err?.code) {
      case 'CastError':
        return this.createCastError(err);
      case 11000:
        return this.createDuplicateFieldsError(err);
      case 'ValidationError':
        return this.createValidationError(err);
      case 'JsonWebTokenError':
        return this.createJWTError();
      case 'TokenExpiredError':
        return this.createJWTExpiredError();
      default:
        return this.createDefaultError(err);
    }
  }

  static createCastError(err: any) {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
  }

  static createDuplicateFieldsError(err: any) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
  }

  static createValidationError(err: any) {
    const errors = Object.values(err.errors).map((el: any) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
  }

  static createJWTError() {
    return new AppError('Invalid token. Please log in again!', 401);
  }

  static createJWTExpiredError() {
    return new AppError('Your token has expired! Please log in again.', 401);
  }

  static createDefaultError(err: any) {
    // return new AppError('Something went wrong!', 500);
    return new AppError(err.message, err.statusCode);
  }
}


const sendErrorDev = (err: AppErrorInterface, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppErrorInterface, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  // Programming or other unknown error: don't leak error details
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

const sendError = (err: AppErrorInterface, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  const error = ErrorFactory.createError(err) as AppErrorInterface;
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else {
    const error = ErrorFactory.createError(err) as AppErrorInterface;
    sendErrorProd(error, res);
  }
};

export default sendError;
