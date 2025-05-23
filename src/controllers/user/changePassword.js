import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

// Change user password
const changePassword = asyncHandler(async (req, res) => {
    const { user_id } = req.user
    const { currentPassword, newPassword } = req.body;

    // Validate
    if (!currentPassword || !newPassword) {
        throw new ErrorResponse(400, { message: "Both current and new passwords are required" });
    }

    if (newPassword.length < 6) {
        throw new ErrorResponse(400, { message: "New password must be at least 6 characters long" });
    }

    // Find user
    const user = await User.findById(user_id);
    if (!user) {
        throw new ErrorResponse(404, { message: "User not found" });
    }

    // Compare current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        new ErrorResponse(401, { message: "Current password is incorrect" });
    }

    // Hash and update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json(new ApiResponse(200, "Password changed successfully"));
});

export { changePassword };