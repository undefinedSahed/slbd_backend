// Assuming you created the separate email sender

import { Cart } from "../../models/cart.model.js";
import { Order } from "../../models/order.model.js";
import { Product } from "../../models/product.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";
import sendOrderConfirmationEmail from "../../utils/orderConfirmEmail.js";

const processCheckout = asyncHandler(async (req, res) => {
    const { user_id, role, email } = req.user; // Assuming user info is in the request from middleware
    const { items, shippingAddress, totalAmount, deliveryCharge, wasCartCheckout } = req.body; // Expecting totalAmount and deliveryCharge from frontend

    if (!user_id || !role === "user") {
        throw new ErrorResponse(401, "Unauthorized");
    }

    if (!items || items.length === 0 || !shippingAddress || !totalAmount || deliveryCharge === undefined) {
        return res.status(400).json(
            new ErrorResponse(400, "Missing required checkout information (items, shippingAddress, totalAmount, deliveryCharge, wasCartCheckout)")
        );
    }

    // 1. Validate products (only existence) and fetch prices
    const productIds = items.map(item => item.product_id);
    const products = await Product.find({ _id: { $in: productIds } }).select('price'); // Fetch only the price

    if (products.length !== items.length) {
        return res.status(400).json(
            new ErrorResponse(400, "One or more products not found")
        );
    }

    // 2. Create the order items with price
    const orderItems = items.map(item => {
        const product = products.find(p => p._id.toString() === item.product_id);
        return {
            product: item.product_id,
            quantity: item.quantity,
            price: product ? product.price : 0 // Ensure price is included
        };
    });

    console.log(items);

    const order = new Order({
        user: user_id,
        items: orderItems,
        shippingAddress,
        totalAmount,
        deliveryCharge,
        totalPayable: parseFloat(totalAmount) + parseFloat(deliveryCharge), // Calculate total payable on backend for safety
        orderStatus: "Pending", // Initial order status
    });

    if (!order) {
        throw new ErrorResponse(500, "Failed to create order");
    }

    const savedOrder = await order.save();

    // 3. Clear the cart (if applicable - determine if it was a cart checkout)
    if (wasCartCheckout) {
        await Cart.deleteOne({ user_id });
    }

    // 4. Send order confirmation email
    sendOrderConfirmationEmail(email, {
        totalAmount: order.totalAmount,
        deliveryCharge: order.deliveryCharge,
        totalPayable: order.totalPayable,
    });

    // 5. Return success response
    return res.status(201).json(
        new ApiResponse(201, "Order placed successfully", { orderId: savedOrder._id, order: savedOrder })
    );
});

export default processCheckout;