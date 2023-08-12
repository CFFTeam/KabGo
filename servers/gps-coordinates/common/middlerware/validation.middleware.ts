import { NextFunction, Response, Request } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { BadRequestException } from '@common/utils/exceptions';

const validationMiddleware = (dto: any, skipMissingProperties: boolean = false) => {
    return (request: Request, response: Response, next: NextFunction) => {
        const instance = plainToInstance(dto, request.body);
        validate(instance, { skipMissingProperties })
		.then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const message = errors
                    .map((error: ValidationError) => Object.values(error.constraints as any))
                    .join(', ');
                return next(new BadRequestException(message));
            }
            return next();
        });
    };
};

export default validationMiddleware;
