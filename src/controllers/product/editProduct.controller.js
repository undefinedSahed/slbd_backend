import { Category } from "../../models/category.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

const editCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;
    const { title, description } = req.body;

    if (role !== "admin") {
        return res.status(403).json(
            new ErrorResponse(403, "You are not authorized to perform this action")
        );
    }

    const category = await Category.findById(id);
    if (!category) {
        return res.status(404).json(new ErrorResponse(404, "Category not found"));
    }

    let imageUrl = category.image;

    if (req.file) {
        // Upload new image to Cloudinary
        const uploadResponse = await uploadOnCloudinary(req.file.path);
        if (!uploadResponse) {
            return res.status(500).json(
                new ErrorResponse(500, "Failed to upload new category image")
            );
        }
        imageUrl = uploadResponse.url;
    }

    // Update category fields
    category.title = title || category.title;
    category.description = description || category.description;
    category.image = imageUrl;

    console.log(imageUrl)

    await category.save();

    return res.status(200).json(
        new ApiResponse(200, "Category updated successfully", category)
    );
});

export default editCategory;
