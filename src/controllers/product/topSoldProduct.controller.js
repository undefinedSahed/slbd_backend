import { Product } from "../../models/product.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getTopSoldProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({ topSold: true });
    res.status(200).json(
        new ApiResponse(200, "Featured products fetched successfully", products)
    )
})
