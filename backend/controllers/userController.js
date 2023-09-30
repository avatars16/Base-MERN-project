import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import ValidationError from "../errors/validationError.js";

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        throw new ValidationError("Invalid user or password");
    }
});

// @desc Auth user/set token
// route POST /api/users/auth/google
// @access Public
const googleAuthUser = asyncHandler(async (req, res) => {
    const { credential, clientId, select_by } = req.body;
    const decodedToken = jwt.decode(credential);
    if (
        decodedToken.aud !== process.env.GOOGLE_CLIENT_ID ||
        clientId !== process.env.GOOGLE_CLIENT_ID ||
        decodedToken.exp < Math.floor(Date.now() / 1000 || !email_verified)
    ) {
        throw new Error("Something went wrong");
    }
    const user = await User.findOne({ email: decodedToken.email });
    if (user && user.googleId === undefined) {
        user.googleId = decodedToken.sub;
        await user.save();
        generateToken(res, user._id);
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    }
    if (user.googleId === decodedToken.sub) {
        generateToken(res, user._id);
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    }
    const newUser = await User.create({
        name: decodedToken.name,
        email: decodedToken.email,
        googleId: decodedToken.sub,
    });
    if (newUser) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        throw new ValidationError("Invalid user data");
    }
});

// @desc Register a new user
// route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new ValidationError("Email address already taken", [{ name: "email", message: "Email adress taken" }]);
    }
    const user = await User.create({
        name,
        email,
        password,
    });
    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc LogoutUser
// route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0), sameSite: "strict" });
    res.status(200).json({ message: `User Logged out` });
});

// @desc Get user profile
// route Get /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    };
    res.status(200).json({ user });
});

// @desc Update user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
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
    res.status(200).json({ _id: req.user._id, name: updatedUser.name, email: updatedUser.email });
});

// @desc Update user profile
// route DELETE /api/users/profile
// @access Private
const deleteUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    const error = await User.deleteOne({ _id: req.user._id });
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0), sameSite: "strict" });
    res.status(200).send();
});

export { authUser, googleAuthUser, registerUser, logoutUser, getUserProfile, updateUserProfile, deleteUserProfile };
