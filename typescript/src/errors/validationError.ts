import { Request, Response, NextFunction } from "express";

class ValidationError extends Error {
    name: string;
    fields?: { [key: string]: string }[];
    constructor(message: string, fields?: { [key: string]: string }[]) {
        super(message);
        this.name = "ValidationError";
        this.fields = fields;
    }

    // Custom static method to handle ValidationError
    static handle(error: ValidationError, req: Request, res: Response, next: NextFunction) {
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
