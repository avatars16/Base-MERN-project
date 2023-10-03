import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware";
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    googleAuthUser,
} from "../controllers/userController";

router.post("/auth/google", googleAuthUser);
router.post("/auth", authUser);
router.post("/", registerUser);
router.post("/logout", logoutUser);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
    .delete(protect, deleteUserProfile);

export default router;
