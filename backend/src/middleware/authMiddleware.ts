import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { jwtUserToken } from "../../types/jwtTokens";
import logger from "../logger";

const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwtUserToken;
            let user = await User.findById(decoded.userId).select("-password");
            if (user === null) throw new Error("Not authorized, invalid user id");
            req.user = user;
            next();
        } catch (error) {
            logger.error(error);
            res.status(401);
            throw new Error("Not authorized, invalid token");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized; no token");
    }
});

export { protect };
