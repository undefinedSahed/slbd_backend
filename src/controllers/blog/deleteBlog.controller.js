// controllers/blog/deleteBlog.js
import { Blog } from "../../models/blog.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";
import { ApiResponse } from "../../utils/apiResponse.js";

export const deleteBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const { role } = req.user;

    if (role !== "admin") {
        return res.status(403).json(
            new ErrorResponse(403, "You are not authorized to delete blog")
        )
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
        return res.status(404).json(
            new ErrorResponse(404, "Blog not found")
        )
    }

    await blog.deleteOne();

    return res.status(200).json(
        new ApiResponse(200, "Blog deleted successfully")
    )

})


