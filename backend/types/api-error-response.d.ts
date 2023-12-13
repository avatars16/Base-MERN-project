import { PermissionErrorResponse } from "../src/errors/permission-error";
import { ValidationErrorResponse } from "../src/errors/validation-error";
import { ErrorResponse } from "../src/middleware/error.middleware";

export type ApiReponseError = ErrorResponse | PermissionErrorResponse | ValidationErrorResponse;
