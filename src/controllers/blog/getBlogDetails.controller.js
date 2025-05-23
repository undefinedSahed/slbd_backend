import { Blog } from "../../models/blog.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

export const getBlogDetails = asyncHandler(async (req, res) => {
    let { title } = req.params;

    title = decodeURIComponent(title).trim();

    // Use a case-insensitive, exact-match regex
    const blog = await Blog.findOne({
        title: { $regex: new RegExp(`^${title}$`, "i") }
    });

    if (!blog) {
        return res.status(404).json(
            new ErrorResponse(404, "Blog not found")
        );
    }

    res.status(200).json(
        new ApiResponse(200, "Blog fetched successfully", blog)
    );
});
