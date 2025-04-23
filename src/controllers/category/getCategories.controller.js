import { asyncHandler } from "../../utils/asyncHandler.js";
import { Category } from "../../models/category.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";

// Get all categories
const getAllCategories = asyncHandler(async (req, res) => {

    // Fetch all categories from the database and return them as a response
    const categories = await Category.find().populate("products");

    res.status(200).json(
        new ApiResponse(200, "Categories fetched successfully", categories)
    )

})


export default getAllCategories;