import { asyncHandler } from "../../utils/asyncHandler.js";
import { Category } from "../../models/category.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

// Create a new category
const createCategory = asyncHandler( async (req, res) => {

    // Validate request body
    const { title, description, images } = req.body;

    // Check if category with the same title already exists
    const existingCategory = await Category.findOne({ title })

    if(existingCategory) {
        return res.status(400).json(
            new ErrorResponse(400, "Category with the same title already exists")
        )
    }

    const newCategory = new Category({
        title,
        description,
        images
    })

    // Save the new category to the database and return the created category as a response
    const createdCategory = await newCategory.save();

    res.status(201).json(
        new ApiResponse(201, "Category created successfully", createdCategory)
    )

})

export default createCategory;