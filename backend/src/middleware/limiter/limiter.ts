import rateLimit from "express-rate-limit";
const MESSAGE = "Too many requests, please try again later.";

const createLimiter = (windowMs: number, max: number, message: string) => {
    return rateLimit({
        windowMs,
        max,
        message: { message: message },
    });
};

const signUpSignInLimiter = createLimiter(10 * 60 * 1000, 100, MESSAGE);

export { signUpSignInLimiter };
