import { Cart } from "../../models/cart.model.js";
import { Order } from "../../models/order.model.js";
import { Product } from "../../models/product.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";
import sendOrderConfirmationEmail from "../../utils/orderConfirmEmail.js";

const createOrder = asyncHandler(async (req, res) => {
    const { user_id, role, email } = req.user; // User info from auth middleware
    const { items, shippingAddress, deliveryCharge, wasCartCheckout } = req.body;

    // Check user role
    if (!user_id || role !== "user") {
        throw new ErrorResponse(401, "Unauthorized");
    }

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0 || !shippingAddress || deliveryCharge === undefined) {
        return res.status(400).json(
            new ErrorResponse(400, "Missing required checkout information (items, shippingAddress, deliveryCharge)")
        );
    }

    // Get product IDs from items
    const productIds = items.map(item => item.product_id);

    // Fetch products with price and discount
    const products = await Product.find({ _id: { $in: productIds } }).select("price discount");

    if (products.length !== items.length) {
        return res.status(400).json(
            new ErrorResponse(400, "One or more products not found")
        );
    }

    // Build order items applying discount
    const orderItems = items.map(item => {
        const product = products.find(p => p._id.toString() === item.product_id);
        if (!product) {
            throw new ErrorResponse(400, `Product not found: ${item.product_id}`);
        }
        const priceAfterDiscount = product.price - (product.price * (product.discount || 0) / 100);
        return {
            product: item.product_id,
            quantity: item.quantity,
            price: priceAfterDiscount > 0 ? priceAfterDiscount : 0,
        };
    });

    // Calculate total amount from discounted prices
    const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalPayable = totalAmount + parseFloat(deliveryCharge);

    // Create new order document
    const order = new Order({
        user: user_id,
        items: orderItems,
        shippingAddress,
        totalAmount,
        deliveryCharge,
        totalPayable,
        orderStatus: "pending",
    });

    const savedOrder = await order.save();

    // Clear cart if needed
    if (wasCartCheckout) {
        await Cart.deleteOne({ user_id });
    }

    // Send confirmation email
    sendOrderConfirmationEmail(email, {
        totalAmount,
        deliveryCharge,
        totalPayable,
    });

    // Send success response
    return res.status(201).json(
        new ApiResponse(201, "Order placed successfully", { orderId: savedOrder._id, order: savedOrder })
    );
});

export default createOrder;
