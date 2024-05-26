import { 
    Request, 
    Response, 
    NextFunction, 
} from "express";



export type AsyncFunction<T extends Request = Request> = (req: T, res: Response, next: NextFunction) => Promise<any>;
export type RequestHandler<T extends Request = Request> = (req: T, res: Response, next: NextFunction) => void;
export type TAsyncHandler = <T extends Request = Request>(fn: AsyncFunction<T>) => RequestHandler<T>;
export type ErrorAsyncFunction = (err: any, req: Request, res: Response, next: NextFunction) => void;
// export type ErrorAsyncFunction = <T extends Request = Request>(err: any, req: T, res: Response, next: NextFunction) => void;