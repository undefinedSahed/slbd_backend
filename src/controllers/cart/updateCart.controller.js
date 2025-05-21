import { Cart } from "../../models/cart.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

const updateCartItemQuantity = asyncHandler(async (req, res) => {
    const { user_id, role } = req.user;

    if (!user_id || role !== "user") {
        return res.status(400).json(
            new ErrorResponse(400, "Invalid user role or User ID not found in token")
        );
    }

    const { items } = req.body; // Expecting an array of items with product_id and quantity

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json(
            new ErrorResponse(400, "An array of cart items with product_id and quantity is required")
        );
    }

    const cart = await Cart.findOne({ user_id });

    if (!cart) {
        return res.status(404).json(
            new ErrorResponse(404, "Cart not found for this user")
        );
    }

    let updated = false;

    for (const itemToUpdate of items) {
        const { product_id, quantity } = itemToUpdate;

        if (!product_id || typeof quantity !== "number" || quantity < 1) {
            continue; // Skip invalid item updates, or you could return an error
        }

        const itemIndex = cart.items.findIndex(
            item => item.product_id.toString() === product_id
        );

        if (itemIndex !== -1) {
            cart.items[itemIndex].quantity = quantity;
            updated = true;
        }
    }

    if (updated) {
        await cart.save();
        return res.status(200).json(
            new ApiResponse(200, "Cart items quantity updated successfully", cart)
        );
    } else {
        return res.status(404).json(
            new ErrorResponse(404, "No matching items found in the cart to update")
        );
    }
});

export default updateCartItemQuantity;