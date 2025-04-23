import { Router } from "express";
import createCategory from "../controllers/category/createCategory.controller.js";
import getAllCategories from "../controllers/category/getCategories.controller.js";
import { authenticateUser } from "../middlewares/auth.middlewares.js";

const router = Router();

// Create a new category
router.post("/createcategory", authenticateUser, createCategory)

// Get all categories
router.get("/", getAllCategories)


export default router;