import { Request, Response, NextFunction } from "express";
import logger from "../logger";
import { ErrorResponse } from "../middleware/error.middleware";

type Fields = { [key: string]: string }[];

export interface ValidationErrorResponse extends ErrorResponse {
    error: {
        code: number;
        message: string;
        fields?: Fields;
    };
}

class ValidationError extends Error {
    name: string;
    fields?: Fields;
    constructor(message: string, fields?: Fields) {
        super(message);
        this.name = "ValidationError";
        this.fields = fields;
    }
    // Custom static method to handle ValidationError
    static handle(error: ValidationError, _req: Request, res: Response, _next: NextFunction) {
        logger.warn(error.message);
        res.status(400).json({
            success: false,
            error: {
                code: 400,
                message: error.message || "Validation Error",
                fields: error.fields || [],
            },
        });
    }
}

export default ValidationError;
