import { Router } from "express";
import { addReview, getReviews } from "../controllers/review/review.controller.js";
import { authenticateUser } from "../middlewares/auth.middlewares.js";

const router = Router();

// Add a review to a product
router.post("/:productId", authenticateUser, addReview);

// Get all reviews for a product
router.get("/:productId", getReviews);

export default router;
