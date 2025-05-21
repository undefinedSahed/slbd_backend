import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";
import { Cart } from "../../models/cart.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const addToCart = asyncHandler(async (req, res) => {

    const { user_id, role } = req.user;
    const { product_id, quantity } = req.body;

    if (!user_id && role == "user") {
        return res.status(400).json(
            new ErrorResponse(400, "User ID not found")
        );
    }



    let cart = await Cart.findOne({ user_id: user_id }).populate({
        path: "items.product_id",
        populate: {
            path: "category",
        },
    });

    if (!cart) {
        cart = new Cart({
            user_id: user_id,
            items: [{ product_id: product_id, quantity }]
        });
    } else {

        const itemIndex = cart.items.findIndex(
            (item) => item.product_id._id.toString() === product_id.toString()
        );


        if (itemIndex !== -1) {
            cart.items[itemIndex].quantity += quantity;
            res.status(200).json(
                new ApiResponse(200, "Product is already in cart", cart)
            );
        } else {
            cart.items.push({ product_id: product_id, quantity });
        }
    }

    const addedProduct = await cart.save();

    res.status(200).json(
        new ApiResponse(200, "Product added to cart successfully", addedProduct)
    );
});

export default addToCart;