import { Router } from "express";
import { createUser } from "../controllers/user/register.controllers.js";
import verifyEmail from "../controllers/user/verifyEmail.controllers.js";
import loginUser from "../controllers/user/login.controllers.js";
import getAllUsers from "../controllers/user/getUsers.controllers.js";
import { authenticateUser } from "../middlewares/auth.middlewares.js";
import getUserProfile from "../controllers/user/getUserProfile.js";
import { upload } from "../middlewares/multer.middleware.js";
import { updateUserProfile } from "../controllers/user/updateProfile.js";


const router = Router();

// Get users route
router.get("/getallusers", authenticateUser, getAllUsers);


// Register new user route
router.post("/register", createUser);


// Email verification route
router.post("/register/verifyemail", verifyEmail);


// Login route
router.post("/login", loginUser);

// Get user profile
router.get("/profile", authenticateUser, getUserProfile)


// Update Profile
router.put("/profile/update", authenticateUser, upload.single("avatar"), updateUserProfile);

export default router;