import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";
import { ApiResponse } from '../../utils/apiResponse.js';

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
        return res.status(400).json(
            new ErrorResponse(400, { message: "Please provide email and password" })
        );
    }

    // Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(401).json(
            new ErrorResponse(401, "User is not registered") 
        );
    }

    // Check if email is verified
    if (!user.verified) {
        return res.status(403).json(
            new ErrorResponse(403, "Please verify your email before logging in.")
        );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json(
            new ErrorResponse(401, "Password is incorrect")
        );
    }

    // Generate JWT token
    const accessToken = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY }
    );

    // Successful login response and send access token
    return res.status(200).json(
        new ApiResponse(200, "Login successful", {
            id: user._id,
            email: user.email,
            fullname: user.fullname,
            role: user.role,
            accessToken
        })
    );

})

export default loginUser;