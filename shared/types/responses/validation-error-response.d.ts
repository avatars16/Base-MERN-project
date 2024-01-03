import { BaseErrorResponse } from "./base-response";

export type Fields = { path: string; message: string }[];

export type ValidationErrorResponse = BaseErrorResponse & {
    error: {
        code: number;
        name: "ValidationError";
        message: string;
        fields?: Fields;
    };
};
