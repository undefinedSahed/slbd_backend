import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

const getUserProfile = asyncHandler(async (req, res) => {

    const { user_id } = req.user;

    if (!user_id) {
        return res.status(400).json(
            new ErrorResponse(400, "User id is required")
        )
    }

    const userProfile = await User.findById(user_id);

    if (!userProfile) {
        return res.status(404).json(
            new ErrorResponse(404, "No user found with this id")
        )
    }

    res.status(200).json(
        new ApiResponse(200, "User profile fetched successfully", userProfile)
    )

})


export default getUserProfile;