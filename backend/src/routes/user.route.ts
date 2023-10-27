import express from "express";
const router = express.Router();
import { protect } from "../middleware/auth.middleware";
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    googleAuthUser,
} from "../controllers/user.controller";
import { signUpSignInLimiter } from "../middleware/limiter/limiter";
import addUserValidator from "../middleware/user/user-validation.middleware";
import validatorHandler from "../middleware/validator.middleware";

router.post("/auth/google", signUpSignInLimiter, googleAuthUser);
router.post("/auth", signUpSignInLimiter, authUser);
router.post("/", signUpSignInLimiter, addUserValidator, validatorHandler, registerUser);
router.post("/logout", logoutUser);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
    .delete(protect, deleteUserProfile);

export default router;
