import { Review } from "../../models/review.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

const addReview = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const { user_id } = req.user;


    if (!user_id) {
        return res.status(401).json(
            new ErrorResponse(401, "User not authenticated")
        );
    }

    // Validate input
    if (!rating || !comment) {
        return res.status(400).json(new ErrorResponse(400, "Rating and comment are required"));
    }

    // Create new review
    const review = await Review.create({
        product: productId,
        user: user_id,
        rating,
        comment
    });

    res.status(201).json(new ApiResponse(201, "Review added successfully", review));
});


// get all reviews for a product
const getReviews = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId })
        .populate("user", "fullname avatar");

    res.status(200).json(new ApiResponse(200, "Reviews fetched successfully", reviews));
});


export { addReview, getReviews };