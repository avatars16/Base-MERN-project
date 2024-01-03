import { BaseErrorResponse } from "./base-response";

export type PermissionErrorResponse = UnauthorizedResponse | ForbiddenResponse;
export type PermissionErrorNames = "Unauthorized" | "Forbidden";

type UnauthorizedResponse = BaseErrorResponse & {
    error: {
        code: 401;
        name: "Unauthorized";
        message: string;
    };
};

type ForbiddenResponse = BaseErrorResponse & {
    error: {
        code: 403;
        name: "Forbidden";
        message: string;
    };
};
