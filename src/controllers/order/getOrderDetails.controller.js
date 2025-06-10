import { Order } from "../../models/order.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";


const getOrderDetails = asyncHandler(async (req, res) => {
    const { user_id } = req.user;
    const { orderId } = req.params;

    // Find order by ID and populate product info in items
    const order = await Order.findById({ _id: orderId })
        .populate("items.product", "title thumbnail price");

    if (!order) {
        new ErrorResponse(404, "Order not found");
    }

    // If role is user, check if the order belongs to this user
    if (order.user.toString() !== user_id) {
        new ErrorResponse(401, "Unauthorized access to this order");
    }

    return res.status(200).json(
        new ApiResponse(200, "Order details retrieved successfully", { order })
    );
});

export default getOrderDetails;
