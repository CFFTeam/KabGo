import { NextFunction, Request, Response, Router } from 'express';

const catchAsync = function (fn: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch((err: Error) => next(err));
    };
  };
  
  export default catchAsync