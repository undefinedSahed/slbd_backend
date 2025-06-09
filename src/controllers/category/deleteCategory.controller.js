import { Category } from "../../models/category.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

export const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;

    // Authorization check
    if (role !== "admin") {
        return res.status(403).json(
            new ErrorResponse(403, "You are not authorized to perform this action")
        );
    }

    // Find category
    const category = await Category.findById(id);

    if (!category) {
        return res.status(404).json(
            new ErrorResponse(404, "Category not found")
        );
    }

    // Check if category has products
    if (category.products.length > 0) {
        return res.status(400).json(
            new ErrorResponse(400, "Cannot delete category with associated products")
        );
    }

    // Delete the category
    await Category.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, "Category deleted successfully")
    );
});
