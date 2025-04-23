import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { User } from "../../models/user.model.js"
import jwt from "jsonwebtoken"
import { ErrorResponse } from "../../utils/errorResponse.js";

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {

    const { role } = req.user;

    const users = await User.find();


    if (role == "admin") {
        res.json(
            new ApiResponse(200, users)
        )
    } else {
        res.json(
            new ErrorResponse(404, { message: "You are not authorized to get users" })
        )
    }
})

export default getAllUsers;