import mongoose from "mongoose";
import ValidationError from "../errors/validation-error";
import { Request, Response, NextFunction } from "express";
import logger from "../logger";
import PermissionError from "../errors/permission-error";

const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not found -${req.originalUrl}`);
    res.status(404);
    next(error);
};
export type ErrorResponse = {
    success: boolean;
    error: {
        code: number;
        message: string;
        stack?: string | undefined;
    };
};

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    if (err instanceof ValidationError) return ValidationError.handle(err, req, res, next);
    if (err instanceof PermissionError) return PermissionError.handle(err, req, res, next);
    else if (err instanceof mongoose.Error.CastError && err.kind === "ObjectId") {
        statusCode = 404;
        message = "Resource not found";
    }
    logger.error(err);
    const response: ErrorResponse = {
        success: false,
        error: {
            code: statusCode,
            message: message,
            stack: process.env.NODE_ENV === `production` ? undefined : err.stack,
        },
    };
    res.status(statusCode).json(response);
};

export { errorHandler, notFound };
