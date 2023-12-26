import { ValidationError } from "sequelize";
import { Request, Response, NextFunction } from "express";
export function handleSequilizeValidationError(
    error: ValidationError,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    const fields = error.errors.map((err) => {
        return {
            field: err.path,
            message: err.message,
        };
    });
    res.status(400).json({
        success: false,
        error: {
            code: 400,
            message: "Database validation Error",
            fields: fields || [],
        },
    });
}
