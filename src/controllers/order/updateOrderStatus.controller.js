import { Order } from "../../models/order.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    const { role } = req.user;

    // Only allow admin to update
    if (role !== "admin") {
        throw new ErrorResponse(403, "Access denied. Only admin can update order status.");
    }

    // Validate status
    const allowedStatuses = ["pending", "processing", "shipped", "delivered", "cancelled", "returned"];
    if (!allowedStatuses.includes(orderStatus)) {
        throw new ErrorResponse(400, "Invalid order status value");
    }

    // Find and update
    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { orderStatus },
        { new: true, runValidators: true }
    );

    if (!updatedOrder) {
        throw new ErrorResponse(404, "Order not found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Order status updated successfully", updatedOrder)
    );
});

export default updateOrderStatus;
