import { Order } from "../../models/order.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

const getAllOrders = asyncHandler(async (req, res) => {
    const { role } = req.user;

    if (role !== "admin") {
        return res.status(403).json(
            new ErrorResponse(401, "You are not authorized to access this route")
        )
    }

    const orders = await Order.find().sort({ createdAt: -1 }).populate("user", "fullname email").populate("items.product", "title price");

    return res.status(200).json(
        new ApiResponse(200, "Orders fetched successfully", orders)
    )
})

export default getAllOrders