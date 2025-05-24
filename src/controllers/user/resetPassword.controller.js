// controllers/auth/resetPassword.js
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

export const resetPassword = asyncHandler(async (req, res) => {

    const { token } = req.query;

    const { newPassword } = req.body;

    if (!token || !newPassword) {
        new ErrorResponse(400, { message: "Token and new password are required" });
    }


    console.log(token)

    // Verify token
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        new ErrorResponse(401, { message: "Invalid or expired token" });
    }

    console.log(decoded)

    const user = await User.findById(decoded.id);
    if (!user) {
        new ErrorResponse(404, { message: "User not found" });
    }

    // Hash new password and save
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json(
        new ApiResponse(200, "Password has been reset successfully")
    );
});
