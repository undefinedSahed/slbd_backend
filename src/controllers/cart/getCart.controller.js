import { Cart } from "../../models/cart.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

const getCart = asyncHandler(async (req, res) => {

    const { user_id, role } = req.user;

    if (!user_id && role == "user") {
        return res.status(400).json(
            new ErrorResponse(400, "User ID not found in token")
        );
    }

    const userCart = await Cart.findOne({ user_id });

    if (!userCart) {
        return res.status(404).json(
            new ErrorResponse(404, "Cart not found for this user. Add product to create cart")
        );
    }

    const populatedCart = await Cart.findOne({ user_id }).populate({
        path: "items.product_id",
        populate: {
            path: "category",
        },
    });

    res.status(200).json(
        new ApiResponse(200, "Cart fetched successfully", populatedCart)
    );
});

export default getCart;