import jwt from "jsonwebtoken";
import { Cart } from "../../models/cart.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

const removeItemFromCart = asyncHandler(async (req, res) => {

    const { user_id, role } = req.user;


    if (!user_id && role !== "user") {
        return res.status(400).json(
            new ErrorResponse(400, "Invalid user role or User ID not found in token")
        );
    }

    const { product_id } = req.body;

    if (!product_id) {
        return res.status(400).json(
            new ErrorResponse(400, "Product ID is required")
        );
    }


    const updatedCart = await Cart.findOneAndUpdate(
        { user_id: user_id },
        { $pull: { "items": { product_id: product_id } } },
        { new: true }
    );

    res.status(200).json(
        new ApiResponse(200, "Item removed from cart successfully", updatedCart)
    );

});

export default removeItemFromCart;