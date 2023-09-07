interface AppErrorInterface {
    status: string;
    statusCode: number;
    isOperational: boolean;
    message: string;
    stack?: string;
}

class AppError extends Error implements AppErrorInterface {
    public status: string;
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statusCode: number) {
      super(message); // pass argument to Error class, it automatically knows that's a message
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }

export {AppErrorInterface}
export default AppError