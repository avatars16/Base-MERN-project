import jwt from "jsonwebtoken";
import { Response } from "express";
import { ObjectId } from "mongoose";

const generateToken = (res: Response, userId: ObjectId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 6 * 60 * 1000,
    });
};

export default generateToken;
