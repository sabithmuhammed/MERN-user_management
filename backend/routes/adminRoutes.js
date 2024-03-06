import express from "express";
import {
    authAdmin,
    logoutAdmin,
    registerAdmin,
    getAllUsers,
    getUser,
    updateUser,
    addUser,
    deleteUser
} from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js";
import imageUpload from "../middlewares/multerMiddleware.js";
import { adminProtect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.post("/", imageUpload,registerUser);
router.post("/auth", authAdmin);
router.post("/logout", logoutAdmin);
router.post("/register", registerAdmin);
router.get("/users", adminProtect,getAllUsers);
router.get("/getUser/:userId", adminProtect,getUser);
router.put("/update", adminProtect,imageUpload,updateUser);
router.post("/add-user", adminProtect,imageUpload,addUser);
router.delete("/delete-user/:userId",adminProtect, deleteUser);
// router 
//     .route("/profile")
//     .get(protect, getUserProfile)
//     .put(protect,imageUpload, updateUserProfile);

export default router;
