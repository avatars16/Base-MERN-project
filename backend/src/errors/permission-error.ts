import { Request, Response, NextFunction } from "express";
import logger from "../logger";
import { ErrorResponse } from "../middleware/error.middleware";

type errorType = "unauthorized" | "forbidden";

export interface PermissionErrorResponse extends ErrorResponse {
    error: {
        name: errorType;
        code: number;
        message: string;
    };
}

class PermissionError extends Error {
    name: string;
    type: errorType;
    code: number;
    constructor(type: errorType, message: string) {
        super(message);
        this.name = "PermissionError";
        this.type = type;
        this.code = type === "unauthorized" ? 401 : 403;
    }
    // Custom static method to handle ValidationError
    static handle(error: PermissionError, _req: Request, res: Response, _next: NextFunction) {
        error.message = `${error.type}: ${error.message}` || "Permission Error";
        logger.warn(error.message);
        const reponse: PermissionErrorResponse = {
            success: false,
            error: {
                name: error.type,
                code: error.type === "unauthorized" ? 401 : 403,
                message: error.message,
            },
        };
        res.status(error.code).json(reponse);
    }
}

export default PermissionError;
