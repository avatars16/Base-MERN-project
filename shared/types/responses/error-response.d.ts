import { PermissionErrorResponse } from "./permission-error-response";
import { BaseErrorResponse, GenericErrorResponse } from "./base-response";
import { ValidationErrorResponse } from "./validation-error-response";

export type ErrorResponse = GenericErrorResponse | PermissionErrorResponse | ValidationErrorResponse;
