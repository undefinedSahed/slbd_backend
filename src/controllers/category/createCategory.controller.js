import { asyncHandler } from "../../utils/asyncHandler.js";
import { Category } from "../../models/category.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { ErrorResponse } from "../../utils/errorResponse.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

const createCategory = asyncHandler(async (req, res) => {
    const { role } = req.user;
    const { title, description } = req.body;

    if (role !== "admin") {
        return res.status(403).json(new ErrorResponse(403, "Unauthorized"));
    }

    const existingCategory = await Category.findOne({ title });
    if (existingCategory) {
        return res.status(400).json(new ErrorResponse(400, "Category already exists"));
    }

    const imagePath = req.file?.path;


    if (!imagePath) {
        return res.status(400).json(new ErrorResponse(400, "Image is required"));
    }

    const imageCloud = await uploadOnCloudinary(imagePath);

    if (!imageCloud?.url) {
        return res.status(500).json(new ErrorResponse(500, "Image upload failed"));
    }

    const newCategory = new Category({
        title,
        description,
        image: imageCloud.url
    });

    const createdCategory = await newCategory.save();

    res.status(201).json(
        new ApiResponse(201, "Category created successfully", createdCategory)
    );
});

export default createCategory;
