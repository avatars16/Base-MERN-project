export type BaseResponse = {
    success: boolean;
};

export type BaseErrorResponse = BaseResponse & {
    success: false;
    error: {
        code: number;
        name: string;
        message: string;
    };
};

export type GenericErrorResponse = BaseErrorResponse & {
    error: {
        name: "GenericError";
        originalName: string;
    };
};
