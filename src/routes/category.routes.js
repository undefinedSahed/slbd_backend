import { Router } from "express";
import createCategory from "../controllers/category/createCategory.controller.js";
import getAllCategories from "../controllers/category/getCategories.controller.js";
import { authenticateUser } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middleware.js";
import { editCategory } from "../controllers/category/editCategory.controller.js";
import { deleteCategory } from "../controllers/category/deleteCategory.controller.js";

const router = Router();

// Create a new category
router.post("/createcategory", authenticateUser, upload.single("image"), createCategory)

// Get all categories
router.get("/", getAllCategories)


// Edit category
router.put(
    "/edit/:id",
    authenticateUser,
    upload.single("image"), // "image" should match field name sent from frontend/Postman
    editCategory
);

// Delete category
router.delete("/delete/:id", authenticateUser, deleteCategory)

export default router;