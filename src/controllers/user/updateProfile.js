import { User } from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import fs from "fs";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

export const updateUserProfile = asyncHandler(async (req, res) => {

    const { user_id } = req.user; // comes from verifyToken

    const user = await User.findById(user_id);

    if (!user) {
        throw new ErrorResponse("User not found", 404);
    }

    const { fullname, mobile, city } = req.body;

    // ✅ Update only if present in req.body
    if (fullname) user.fullname = fullname;
    if (mobile) user.mobile = mobile;
    if (city) user.city = city;

    // ✅ Handle image upload if exists
    if (req.file) {
        const localPath = req.file.path;

        const uploadedImage = await uploadOnCloudinary(localPath);

        if (!uploadedImage?.secure_url) {
            throw new ErrorResponse(500, "Image upload failed");
        }

        user.avatar = uploadedImage.secure_url;

        // ✅ Delete temp file
        fs.unlinkSync(localPath);
    }

    await user.save();

    return res
        .status(200)
        .json(new ApiResponse(200, "Profile updated successfully", user));
});
