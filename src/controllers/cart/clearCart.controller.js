import { Cart } from "../../models/cart.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

const clearCart = asyncHandler(async (req, res) => {
    const { user_id, role } = req.user;

    if (!user_id && role !== "user") {
        return res.status(400).json(
            new ErrorResponse(400, "Invalid user role or User ID not found in token")
        );
    }

    const cart = await Cart.findOne({ user_id });

    if (!cart) {
        return res.status(404).json(new ErrorResponse(404, "Cart not found"));
    }

    cart.items = [];
    await cart.save();

    return res.status(200).json(
        new ApiResponse(200, "Cart cleared successfully")
    );

})


export default clearCart