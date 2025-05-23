import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middlewares.js";
import { createBlog } from "../controllers/blog/createBlog.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getBlogs } from "../controllers/blog/getBlogs.js";
import { getBlogDetails } from "../controllers/blog/getBlogDetails.controller.js";

const router = Router();

// Create a new blog
router.post("/create-blog", authenticateUser, upload.single("image", { maxCount: 1 }), createBlog);

// Get all blogs
router.get("/", getBlogs);

// Get a single Blog details
router.get("/:title", getBlogDetails)

export default router;