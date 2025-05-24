import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import emailSender from "../../utils/emailSender.js";
import emailTemplate from "../../utils/verifyEmailTemplate.js";
import { User } from "../../models/user.model.js"
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js"
import { ErrorResponse } from "../../utils/errorResponse.js";



// Create new user
const createUser = asyncHandler(async (req, res) => {

    // Validate request body
    const { fullname, email, mobile, password, city, role } = req.body;


    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        return res.status(401).json(
            new ErrorResponse(400, { message: "Email already exists" })
        )
    }

    const existingUserMobile = await User.findOne({ mobile: mobile });

    if (existingUserMobile) {
        return res.status(401).json(
            new ErrorResponse(400, { message: "Mobile number already exists" })
        )
    }


    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
        fullname,
        email,
        mobile,
        password: hashPassword,
        role,
        city
    })

    const savedUser = await user.save();

    const token = jwt.sign(
        { id: savedUser._id, email: savedUser.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: `${process.env.JWT_EMAIL_VERIFY_EXPIRY}` });

    // send the token and email to email sender utils
    emailSender(email, emailTemplate(token, process.env.FRONTEND_URL));

    res.status(201).json(
        new ApiResponse(201, "User created successfully", savedUser)
    )

})


export { createUser }