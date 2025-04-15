import { asyncHandler } from "../../utils/asyncHandler.js";
import { Product } from "../../models/product.model.js"
import { ErrorResponse } from "../../utils/errorResponse.js";
import { Cart } from "../../models/cart.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const addToCart = asyncHandler(async (req, res) => {

    // Validate request body
    const { user_id, product_id, quantity } = req.body;

    // Check if product exists and user has sufficient quantity to add to cart
    const product = await Product.findById(product_id);
    if (!product) {
        new ErrorResponse(404, "Product not found");
    }

    // Check the cart is already exist 
    let cart = await Cart.findOne({ user_id: user_id });

    if (!cart) {
        cart = new Cart({
            user_id: user_id,
            items: [{ product_id: product_id, quantity }]
        });
    } else {
        const itemIndex = cart.items.findIndex(
            (item) => item.product_id.toString() === product_id
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
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