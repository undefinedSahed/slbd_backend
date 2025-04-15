import { Product } from "../../models/product.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const getAllProducts = asyncHandler(async (req, res) => {

    // Fetch all categories from the database and return them as a response
    const products = await Product.find();

    res.status(200).json(
        new ApiResponse(200, "Products fetched successfully", products)
    )

})

export default getAllProducts;