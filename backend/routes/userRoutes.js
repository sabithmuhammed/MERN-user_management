import express from "express";
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import imageUpload from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.post("/", imageUpload,registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.post("/register", registerUser);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect,imageUpload, updateUserProfile);

export default router;
