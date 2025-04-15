import jwt from "jsonwebtoken"
import { ErrorResponse } from "../../utils/errorResponse.js";
import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


const verifyEmail = asyncHandler(async (req, res) => {
    
    const { authorization } = req.headers;

    // Notify the user that token has not been provided
    if (!authorization) {
        return res.status(401).json(
            new ErrorResponse(400, { message: "No token provided" })
        );
    }

    // Verify the token and get the user's email address
    const decoded = jwt.verify(authorization, `${process.env.JWT_SECRET_KEY}`)

    const { email } = decoded;


    // Update user's verified status
    const updateUserVerifiedProps = await User.findOneAndUpdate(
        { email: email },
        { verified: true },
        { new: true }
    )

    // Check if the user exists
    if (!updateUserVerifiedProps) {
        return res.status(404).json(
            new ErrorResponse(404, { message: "User not found" })
        );
    }

    // Send a confirmation email to the user
    res.status(200).json(
        new ApiResponse(201, "Email verified successfully", updateUserVerifiedProps)
    )

})

export default verifyEmail;