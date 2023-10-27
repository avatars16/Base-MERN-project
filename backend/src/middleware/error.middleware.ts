import mongoose from "mongoose";
import ValidationError from "../errors/validation-error";
import { Request, Response, NextFunction } from "express";
import logger from "../logger";

const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not found -${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    if (err instanceof ValidationError) return ValidationError.handle(err, req, res, next);
    else if (err instanceof mongoose.Error.CastError && err.kind === "ObjectId") {
        statusCode = 404;
        message = "Resource not found";
    }

    res.status(statusCode).json({
        success: false,
        error: {
            code: statusCode,
            message: message,
            stack: process.env.NODE_ENV === `production` ? null : err.stack,
        },
    });
};

export { errorHandler, notFound };
