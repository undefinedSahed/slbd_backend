import { Order } from "../../models/order.model.js";
import { Product } from "../../models/product.model.js";
import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

const adminStats = asyncHandler(async (req, res) => {
    const { role } = req.user;
    if (role !== "admin") {
        return res.status(403).json(
            new ErrorResponse(403, "You are not authorized to access this route")
        )
    }

    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const result = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalOrderAmount: { $sum: "$totalAmount" }
            }
        }
    ]);

    const totalAmountofOrders = result[0]?.totalOrderAmount || 0;

    return res.status(200).json(
        new ApiResponse(
            200,
            "Admin Stats fetched successfully",
            {
                totalUsers,
                totalProducts,
                totalOrders,
                totalAmountofOrders
            }
        )
    )
})

export default adminStats;