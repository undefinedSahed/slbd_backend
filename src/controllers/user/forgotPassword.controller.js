// controllers/auth/resetPassword.js
import jwt from "jsonwebtoken";
import { User } from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { ErrorResponse } from "../../utils/errorResponse.js";
import sendResetPasswordEmail from "../../utils/resetPasswordEmail.js";

export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        new ErrorResponse(400, { message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        new ErrorResponse(404, { message: "User not found" });
    }

    // Create reset token
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15m" }
    );

    // Create reset URL for email
    const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    // Send email with reset URL
    await sendResetPasswordEmail(email, resetURL);

    res.status(200).json(
        new ApiResponse(200, "Reset password link sent to email", { emailSent: true })
    );
});
