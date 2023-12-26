import { Request, Response, NextFunction } from "express";
import logger from "../logger";
import PermissionError from "../errors/permission-error";
import { ValidationError } from "sequelize";
import { handleSequilizeValidationError } from "../errors/sequilize-validation.error";

export type ErrorResponse = {
    success: boolean;
    error: {
        code: number;
        message: string;
        stack?: string | undefined;
    };
};

const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not found -${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    if (err instanceof PermissionError) return PermissionError.handle(err, req, res, next);
    if (err instanceof ValidationError) return handleSequilizeValidationError(err, req, res, next);
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
