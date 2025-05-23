import { Order } from "../../models/order.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

// @desc   Get all orders for the logged-in user
// @route  GET /api/orders/user
// @access Private (user only)
const getUserOrders = asyncHandler(async (req, res) => {
    const { user_id, role } = req.user;

    if (!user_id || role !== "user") {
        throw new ErrorResponse(401, "Unauthorized access");
    }

    const orders = await Order.find({ user: user_id })
        .populate("items.product", "title image price") // Populate minimal product info
        .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
        return res.status(200).json(
            new ApiResponse(200, "No orders found", { orders: [] })
        );
    }

    return res.status(200).json(
        new ApiResponse(200, "Orders retrieved successfully", { count: orders.length, orders })
    );
});

export default getUserOrders;
