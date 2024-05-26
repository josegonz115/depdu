import { ErrorAsyncFunction } from "../types/types";

const errorMiddleware: ErrorAsyncFunction = (err:any, req, res, next) => {
    const errorObject = {
        message: (err as Error).message,
        stack:
            process.env.NODE_ENV === "production"
                ? undefined
                : (err as Error).stack
    };
    console.error(errorObject);
    res.status(res.statusCode < 400 ? 400 : res.statusCode || 500).send(errorObject);
};

export default errorMiddleware;