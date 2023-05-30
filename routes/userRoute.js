import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateAvatar,
  verifyUser,
  resetPassword,
  forgotPassword,
} from "../controllers/userController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.route("/verify-account").post(verifyUser);
router.route("/reset-password").post(resetPassword);
router.route("/forgot-password").post(forgotPassword);
router
  .route("/profile/:id")
  .get(authenticateUser, getUserProfile)
  .patch(authenticateUser, updateUserProfile)
  .post(authenticateUser, updateAvatar);

export default router;
