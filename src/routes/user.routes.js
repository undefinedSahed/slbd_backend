import { Router } from "express";
import { createUser } from "../controllers/user/register.controllers.js";
import verifyEmail from "../controllers/user/verifyEmail.controllers.js";
import loginUser from "../controllers/user/login.controllers.js";
import getAllUsers from "../controllers/user/getUsers.controllers.js";
import { authenticateUser } from "../middlewares/auth.middlewares.js";


const router = Router();

// Get users route
router.get("/getallusers", authenticateUser, getAllUsers);


// Register new user route
router.post("/register", createUser);


// Email verification route
router.post("/register/verifyemail", verifyEmail);


// Login route
router.post("/login", loginUser);

export default router;