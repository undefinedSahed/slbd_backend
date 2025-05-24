import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: [true, "fullname is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Please enter a valid email"
            ]
        },
        mobile: {
            type: String,
            required: [true, "Mobile number is required"],
            unique: true,
            trim: true,
            match: [
                /^(?:\+88)?01[3-9][0-9]{8}$/,
                "Please enter a valid Bangladeshi mobile number (e.g., +8801712345678 or 01712345678)"
            ]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"]
        },
        role: {
            type: String,
            default: 'user',
            enum: ['user', 'admin']
        },
        avatar: {
            type: String,
            default: "" // cloudinary image url
        },
        city: {
            type: String,
            required: [true, "City is required"],
            trim: true
        },
        verified: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);