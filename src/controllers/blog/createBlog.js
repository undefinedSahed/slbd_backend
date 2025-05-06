import { Blog } from "../../models/blog.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { ErrorResponse } from "../../utils/errorResponse.js";
import fs from "fs";


export const createBlog = asyncHandler(async (req, res) => {
    const { role } = req.user;

    if (role !== "admin") {
        return res.status(400).json(
            new ErrorResponse(400, "You are not authorized to create blog")
        );
    }

    const { title, description, main_content } = req.body;

    if (!title || !description || !main_content) {
        return res.status(400).json(
            new ErrorResponse(400, "Title and description are required")
        );
    }

    if (!req.file) {
        return res.status(400).json(
            new ErrorResponse(400, "Please upload an image")
        );
    }

    const existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
        return res.status(400).json(
            new ErrorResponse(400, "Blog with the same title already exists")
        );
    }

    const imageLocalPath = req.file.path;

    let imageCloudinaryResponse;
    if (imageLocalPath) {
        imageCloudinaryResponse = await uploadOnCloudinary(imageLocalPath);
        fs.unlinkSync(imageLocalPath);
        if (!imageCloudinaryResponse) {
            return res.status(500).json(
                new ErrorResponse(500, "Failed to upload image to Cloudinary")
            );
        }
    }

    const newBlog = new Blog({
        title,
        description,
        image: imageCloudinaryResponse?.url,
        main_content
    });

    const savedBlog = await newBlog.save();
    res.status(200).json(
        new ApiResponse(200, "Blog created successfully", savedBlog)
    );
});
