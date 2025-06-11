import { Product } from "../../models/product.model.js";
import { Category } from "../../models/category.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;

    if (role !== "admin") {
        return res.status(403).json(
            new ErrorResponse(403, "You are not authorized to perform this action")
        );
    }

    // First, find the product so we can get its category ID before deleting
    const productToDelete = await Product.findById(id);

    if (!productToDelete) {
        return res.status(404).json(
            new ErrorResponse(404, "Product not found")
        );
    }

    // Delete the product
    const deletedProduct = await Product.findByIdAndDelete(id);

    // Remove the product ID from its category
    if (productToDelete.category) {
        await Category.findByIdAndUpdate(
            productToDelete.category,
            { $pull: { products: productToDelete._id } }
        );
    }

    return res.status(200).json(
        new ApiResponse(200, "Product deleted successfully", deletedProduct)
    );
});

export default deleteProduct;