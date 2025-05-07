import { Category } from "../../models/category.model.js";
import { Product } from "../../models/product.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { ErrorResponse } from "../../utils/errorResponse.js"; // Assuming you have ErrorResponse
import { asyncHandler } from "../../utils/asyncHandler.js";

// Function to shuffle an array in place (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const getAllProducts = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        category,
        price,
        sortBy = 'default',
        search
    } = req.query;

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const filter = {};
    const sortOptions = {};

    // Search Filtering by Product Title
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }

    // Category Filtering
    if (category) {
        const categories = await Category.find({ title: { $regex: category, $options: 'i' } });
        if (categories.length > 0) {
            filter.category = { $in: categories.map(cat => cat._id) };
        } else {
            return res.status(404).json(new ErrorResponse(404, "No matching categories found"));
        }
    }

    // Price Filtering
    if (price) {
        const priceRange = price.split('-').map(Number).filter(Number.isFinite);
        if (priceRange.length === 1) {
            filter.price = { $gte: priceRange[0] };
        } else if (priceRange.length === 2) {
            filter.price = { $gte: priceRange[0], $lte: priceRange[1] };
        }
    }

    // Sorting
    switch (sortBy) {
        case 'popular':
            sortOptions.sold = -1;
            break;
        case 'price-low-to-high':
            sortOptions.price = 1;
            break;
        case 'price-high-to-low':
            sortOptions.price = -1;
            break;
        case 'shuffle':
            // We will fetch without specific sorting and shuffle later
            break;
        case 'default':
        default:
            sortOptions.createdAt = -1;
            break;
    }

    const products = await Product.find(filter)
        .populate("category", "title")
        .sort(sortBy === 'shuffle' ? {} : sortOptions) // Don't sort in the query if shuffling
        .skip(skip)
        .limit(parseInt(limit, 10));

    const totalProducts = await Product.countDocuments(filter);

    let dataToSend = products;
    if (sortBy === 'shuffle') {
        shuffleArray(dataToSend);
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            "Products fetched successfully",
            {
                results: dataToSend.length,
                total: totalProducts,
                page: parseInt(page, 10),
                totalPages: Math.ceil(totalProducts / parseInt(limit, 10)),
                data: dataToSend
            }
        )
    );
});

export default getAllProducts;