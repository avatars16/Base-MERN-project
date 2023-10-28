import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import ValidationError from "../errors/validation-error";

const validatorHandler = expressAsyncHandler((req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    const formatedError = errors.array().map((error) => {
        // @ts-ignore - error.path does not exists according to ts, but it does.
        return { name: error.path, message: error.msg };
    });
    throw new ValidationError("Express validation error", formatedError);
});

export default validatorHandler;
