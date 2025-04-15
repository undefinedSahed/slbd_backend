import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { User} from "../../models/user.model.js"

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();

    if (users.length > 0) {
        res.json(
            new ApiResponse(200, users)
        )
    } else {
        res.json(
            new ApiResponse(404, { message: "No users found" })
        )
    }
})

export default getAllUsers;