import { Response } from "./response";

export type SuccessResponse = Response & {
    success: true;
    data: [unknown];
};
