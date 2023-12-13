import asyncHandler from "express-async-handler";
import User from "../models/user.model";
import generateToken from "../utils/generate-token";
import jwt from "jsonwebtoken";
import ValidationError from "../errors/validation-error";
import { TokenPayload } from "google-auth-library";

/**
 * @route POST /api/users/auth
 * @access Public
 * @param {email:string,password:string} req.body
 */
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ where: { email } });
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user.id);
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        });
    } else {
        throw new ValidationError("Invalid username or password");
    }
});

/**
 * @route POST /api/users/auth/google
 * @access Public
 * @param {credential: TokenPayload,clientId:string, select_by} req.body
 */
const googleAuthUser = asyncHandler(async (req, res) => {
    const { credential, clientId, select_by } = req.body;
    const decodedToken = jwt.decode(credential) as TokenPayload;
    if (
        decodedToken.aud !== process.env.GOOGLE_CLIENT_ID ||
        clientId !== process.env.GOOGLE_CLIENT_ID ||
        decodedToken.exp < Math.floor(Date.now() / 1000) ||
        !decodedToken.email_verified
    ) {
        throw new Error("Something went wrong");
    }
    const retrievedUser = await User.findOne({ where: { email: decodedToken.email } });
    if (retrievedUser !== null && retrievedUser.googleId === undefined) {
        retrievedUser.googleId = decodedToken.sub;
        await retrievedUser.save();
    }
    var user;
    if (retrievedUser == null) {
        user = await User.create({
            name: decodedToken.name,
            email: decodedToken.email,
            googleId: decodedToken.sub,
        });
    } else user = retrievedUser;
    generateToken(res, user.id);
    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
    });
});

/**
 * @route POST /api/users
 * @access Public
 * @param {user:User} req.body
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
    });
    if (user) {
        generateToken(res, user.id);
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

/**
 * @route POST /api/users/logout
 * @access Public
 */
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0), sameSite: "strict" });
    res.status(200).json({ message: `User Logged out` });
});

/**
 * @route GET /api/users/profile
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user!.id,
        name: req.user!.name,
        email: req.user!.email,
    };
    res.status(200).json({ user });
});

/**
 * @route PUT /api/users/profile
 * @access Private
 * @param { user:User} req.body
 */
const updateUserProfile = asyncHandler(async (req, res) => {
    if (req.user === undefined) throw new Error("No user in request");
    const user = await User.findByPk(req.user.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
        user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({ _id: req.user.id, name: updatedUser.name, email: updatedUser.email });
});

/**
 * @route DELETE /api/users/profile
 * @access Private
 */
const deleteUserProfile = asyncHandler(async (req, res) => {
    if (req.user === undefined) throw new Error("No user in request");
    const user = await User.findByPk(req.user!.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    await User.destroy({ where: { id: req.user.id } });
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0), sameSite: "strict" });
    res.status(200).send();
});

export { authUser, googleAuthUser, registerUser, logoutUser, getUserProfile, updateUserProfile, deleteUserProfile };
