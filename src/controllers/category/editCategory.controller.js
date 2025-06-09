import { Category } from "../../models/category.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

export const editCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;
    const { title, description } = req.body;

    if (role !== "admin") {
        throw new ErrorResponse(403, "You are not authorized to perform this action");
    }

    const category = await Category.findById(id);
    if (!category) {
        throw new ErrorResponse(404, "Category not found");
    }

    let imageUrl = category.image;

    if (req.file) {
        const uploadResult = await uploadOnCloudinary(req.file.path);
        if (!uploadResult) {
            throw new ErrorResponse(500, "Failed to upload image to Cloudinary");
        }
        imageUrl = uploadResult.url; // This should be the Cloudinary URL
    }

    category.title = title || category.title;
    category.description = description || category.description;
    category.image = imageUrl;

    await category.save();

    return res.status(200).json(
        new ApiResponse(200, "Category updated successfully", category)
    );
});
