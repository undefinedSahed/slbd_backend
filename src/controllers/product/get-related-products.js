import { Product } from "../../models/product.model.js";
import { Category } from "../../models/category.model.js"; // ✅ assuming you have this model
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

export const getRelatedProducts = asyncHandler(async (req, res) => {
    const { category } = req.params;

    // Step 1: Find the category by its title
    const categoryDoc = await Category.findOne({ title: category });

    if (!categoryDoc) {
        return res.status(404).json(
            new ErrorResponse(404, "Category not found.")
        );
    }

    // Step 2: Find products by category ObjectId
    const relatedProducts = await Product.find({ category: categoryDoc._id });

    if (!relatedProducts || relatedProducts.length === 0) {
        return res.status(404).json(
            new ErrorResponse(404, "No related products found for the specified category.")
        );
    }

    return res.status(200).json(
        new ApiResponse(200, "Related products retrieved successfully.", relatedProducts)
    );
});
