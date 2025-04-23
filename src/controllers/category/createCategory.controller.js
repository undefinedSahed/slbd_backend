import { asyncHandler } from "../../utils/asyncHandler.js";
import { Category } from "../../models/category.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { ErrorResponse } from "../../utils/errorResponse.js";


const createCategory = asyncHandler(async (req, res) => {

    const { role } = req.user;


    const { title, description, images } = req.body;

    const existingCategory = await Category.findOne({ title })

    if (role == "admin") {

        if (existingCategory) {
            return res.status(400).json(
                new ErrorResponse(400, "Category with the same title already exists")
            )
        }

        const newCategory = new Category({
            title,
            description,
            images
        })

        const createdCategory = await newCategory.save();

        res.status(201).json(
            new ApiResponse(201, "Category created successfully", createdCategory)
        )
    } else {
        res.status(400).json(
            new ErrorResponse(400, "You are not authorized to create category")
        )
    }

})

export default createCategory;