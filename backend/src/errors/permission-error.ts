import { Request, Response, NextFunction } from "express";
import logger from "../logger";
import {
    PermissionErrorNames,
    PermissionErrorResponse,
} from "../../../shared/types/responses/permission-error-response";

class PermissionError extends Error {
    type: PermissionErrorNames;
    constructor(type: PermissionErrorNames, message: string) {
        super(message);
        this.type = type;
    }
    // Custom static method to handle ValidationError
    static handle(error: PermissionError, _req: Request, res: Response, _next: NextFunction) {
        error.message = `${error.type}: ${error.message}` || "Permission Error";
        logger.warn(error.message);
        let response: PermissionErrorResponse;
        if (error.type === "Unauthorized") {
            response = {
                success: false,
                error: {
                    name: "Unauthorized",
                    code: 401,
                    message: error.message,
                },
            };
        } else {
            response = {
                success: false,
                error: {
                    name: "Forbidden",
                    code: 403,
                    message: error.message,
                },
            };
        }
        res.status(response.error.code).json(response);
    }
}

export default PermissionError;
