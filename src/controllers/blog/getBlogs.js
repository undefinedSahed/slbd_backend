import { Blog } from "../../models/blog.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getBlogs = asyncHandler(async (req, res) => {

    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json(
        new ApiResponse(200, "Blogs fetched successfully", blogs)
    );
});
