// controllers/blog/updateBlog.js
import { Blog } from "../../models/blog.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { ErrorResponse } from "../../utils/errorResponse.js";
import { ApiResponse } from "../../utils/apiResponse.js";

export const updateBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const { title, description, main_content } = req.body;
    const { role } = req.user;

    if (role !== "admin") {
        return res.status(403).json(
            new ErrorResponse(403, "You are not authorized to perform this action")
        )
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
        return res.status(404).json(
            new ErrorResponse(404, "Blog not found")
        )
    }

    // Optional: check for duplicate title if title is being updated
    if (title && title !== blog.title) {
        const existing = await Blog.findOne({ title });
        if (existing) {
            return res.status(400).json(
                new ErrorResponse(400, "Title already exists")
            )
        }
    }

    let imageUrl = blog.image;

    // If a new image is uploaded
    if (req.file) {
        const imageResponse = await uploadOnCloudinary(req.file.path);
        if (!imageResponse) {
            return res.status(400).json(
                new ErrorResponse(400, "Image upload failed")
            )
        }
        imageUrl = imageResponse.url;
    }

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.main_content = main_content || blog.main_content;
    blog.image = imageUrl;

    const updatedBlog = await blog.save();

    return res.status(200).json(
        new ApiResponse(200, "Blog updated successfully", updatedBlog)
    );
});
