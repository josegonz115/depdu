import { Request, Response, NextFunction } from 'express';
import { AsyncFunction, RequestHandler, TAsyncHandler } from '../types/types';

// ensures that any unhandled promise rejectsions in the middleware function are passed to 
// Express's erorr handling middleware

// const asyncHandler:TAsyncHandler = (fn) => (req, res, next) => fn(req, res, next).catch(next);
const asyncMiddleware = <T extends Request>(fn: AsyncFunction<T>): RequestHandler<T> => {
    return (req: T, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};

export default asyncMiddleware;