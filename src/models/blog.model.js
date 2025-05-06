import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Blog title is required"],
            trim: true,
            index: true
        },
        description: {
            type: String,
            required: [true, "Blog description is required"],
            trim: true,
            minlength: [10, "Description must be at least 10 characters long"],
            maxlength: [500, "Description cannot exceed 500 characters"]
        },
        main_content: {
            type: String,
            required: [true, "Blog main content is required"],
            trim: true
        },
        image: {
            type: String,
            required: [true, "Blog image is required"]
        },
    },
    { timestamps: true }
)


export const Blog = mongoose.model("Blog", BlogSchema);