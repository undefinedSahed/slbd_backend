import { Product } from "../../models/product.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getFeaturedProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({ featured: true });
    res.status(200).json(
        new ApiResponse(200, "Featured products fetched successfully", products)
    )

})