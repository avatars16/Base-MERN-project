import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model";
import { jwtUserToken } from "../../types/jwtTokens";
import logger from "../logger";
import PermissionError from "../errors/permission-error";

const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwtUserToken;
            let user = await User.findByPk(decoded.userId); //.select("-password");
            if (user === null) throw new PermissionError("unauthorized", "invalid user id");
            req.user = user;
            next();
        } catch (error) {
            throw new PermissionError("unauthorized", "invalid token");
        }
    } else {
        throw new PermissionError("unauthorized", "no token");
    }
});

export { protect };
