import mongoose from "mongoose";
import ValidationError from "../errors/validationError";
import { Request, Response, NextFunction } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not found -${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    if (err instanceof ValidationError) return ValidationError.handle(err, req, res, next);
    else if (err instanceof mongoose.Error.CastError && err.kind === "ObjectId") {
        statusCode = 404;
        message = "Resource not found";
    }

    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === `production` ? null : err.stack,
    });
};

export { errorHandler, notFound };
