import { Product } from "../../models/product.model.js";
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

    const DeletedProduct = await Product.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, "Product deleted successfully", DeletedProduct)
    )
})


export default deleteProduct;