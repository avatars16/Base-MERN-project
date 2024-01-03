import { Request, Response, NextFunction } from "express";
import logger from "../logger";
import { Fields, ValidationErrorResponse } from "../../../shared/types/responses/validation-error-response";

class ValidationError extends Error {
    fields?: Fields;
    constructor(message: string, fields?: Fields) {
        super(message);
        this.fields = fields;
    }
    // Custom static method to handle ValidationError
    static handle(error: ValidationError, _req: Request, res: Response, _next: NextFunction) {
        logger.warn(error.message);
        const response: ValidationErrorResponse = {
            success: false,
            error: {
                code: 400,
                name: "ValidationError",
                message: error.message || "Validation Error",
                fields: error.fields,
            },
        };
        res.status(400).json(response);
    }
}

export default ValidationError;
