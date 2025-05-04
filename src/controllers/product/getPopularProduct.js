import { Product } from "../../models/product.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getPopularProducts = asyncHandler(async (req, res) => {

    const popularProducts = await Product.find().sort({ sold: -1 }).limit(8);

    res.status(200).json(
        new ApiResponse(200, "Popular products fetched successfully", popularProducts)
    )
})
