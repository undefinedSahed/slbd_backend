import { Product } from "../../models/product.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

export const getSingleProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id)

    if (!product) {
        return res.status(404).json(
            new ErrorResponse(404, "Product not found")
        );
    }

    res.status(200).json(
        new ApiResponse(200, "Product fetched successfully", product)
    );
});
