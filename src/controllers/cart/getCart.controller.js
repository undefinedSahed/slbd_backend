import { Cart } from "../../models/cart.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

const getCart = asyncHandler(async (req, res) => {

    // Validate request body
    const { user_id } = req.body;

    if(!user_id) {
        return res.status(400).json(
            new ErrorResponse(400, "User ID is required")
        );
    }


    const userCart = await Cart.findOne({ user_id });

    if(!userCart) {
        return res.status(404).json(
            new ErrorResponse(404, "Cart not found for this user. Add product to create cart")
        );
    }

    res.status(200).json(
        new ApiResponse(200, "Cart fetched successfully", userCart)
    )

})


export default getCart;