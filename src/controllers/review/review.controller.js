import { Review } from "../../models/review.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";
import { Product } from "../../models/product.model.js";

// ✅ Add Review
const addReview = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const { user_id } = req.user;

    if (!user_id) {
        return res
            .status(401)
            .json(new ErrorResponse(401, "User not authenticated"));
    }

    if (!rating || !comment) {
        return res
            .status(400)
            .json(new ErrorResponse(400, "Rating and comment are required"));
    }

    // ✅ Prevent duplicate reviews
    const existingReview = await Review.findOne({
        product: productId,
        user: user_id,
    });
    if (existingReview) {
        return res
            .status(400)
            .json(new ErrorResponse(400, "You have already reviewed this product"));
    }

    // ✅ Create review
    const review = await Review.create({
        product: productId,
        user: user_id,
        rating,
        comment,
    });

    // ✅ Get all reviews for the product
    const reviews = await Review.find({ product: productId });

    const totalRating = reviews.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = totalRating / reviews.length;

    // ✅ Update product rating and review count (ensure number type)
    await Product.findByIdAndUpdate(productId, {
        rating: Number(averageRating.toFixed(1)),
        reviewsCount: reviews.length,
    });

    res
        .status(201)
        .json(new ApiResponse(201, "Review added successfully", review));
});

// ✅ Get Reviews
const getReviews = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId })
        .sort({ createdAt: -1 })
        .populate("user", "fullname avatar");

    res
        .status(200)
        .json(new ApiResponse(200, "Reviews fetched successfully", reviews));
});

export { addReview, getReviews };
