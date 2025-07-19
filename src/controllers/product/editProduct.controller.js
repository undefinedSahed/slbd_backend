import { Product } from "../../models/product.model.js";
import { Category } from "../../models/category.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorResponse } from "../../utils/errorResponse.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

const editProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;

    // Authorization
    if (role !== "admin") {
        return res.status(403).json(new ErrorResponse(403, "Not authorized"));
    }

    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json(new ErrorResponse(404, "Product not found"));
    }

    // Destructure fields from body
    const {
        title,
        description,
        price,
        discount,
        category,
        specs,
        stock,
        featured,
        sold,
        topSold
    } = req.body;

    // Category change handling
    if (category && category !== String(product.category)) {
        const newCat = await Category.findById(category);
        if (!newCat) {
            return res
                .status(400)
                .json(new ErrorResponse(400, "Provided category does not exist"));
        }

        await Category.findByIdAndUpdate(product.category, {
            $pull: { products: product._id },
        });
        await Category.findByIdAndUpdate(category, {
            $push: { products: product._id },
        });

        product.category = category;
    }

    // Thumbnail upload
    if (req.files?.thumbnail?.[0]) {
        const thumbRes = await uploadOnCloudinary(req.files.thumbnail[0].path);
        if (!thumbRes?.url) {
            return res
                .status(500)
                .json(new ErrorResponse(500, "Failed to upload thumbnail"));
        }
        product.thumbnail = thumbRes.url;
    }

    // Images upload
    if (req.files?.images?.length > 0) {
        const uploaded = [];
        for (const file of req.files.images) {
            const imgRes = await uploadOnCloudinary(file.path);
            if (imgRes?.url) {
                uploaded.push(imgRes.url);
            }
        }
        if (uploaded.length === 0) {
            return res
                .status(500)
                .json(new ErrorResponse(500, "Failed to upload images"));
        }
        product.images = uploaded;
    }

    // Update other fields
    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.price = !isNaN(price) ? price : product.price;
    product.discount = !isNaN(discount) ? discount : product.discount;
    product.stock = stock ?? product.stock;
    product.featured = featured != null ? featured === "true" || featured === true : product.featured;
    product.sold = sold ?? product.sold;
    product.topSold = topSold ?? product.topSold;

    if (specs) {
        try {
            product.specs = JSON.parse(specs);
        } catch {
            return res
                .status(400)
                .json(new ErrorResponse(400, "Specs must be valid JSON"));
        }
    }

    await product.save();
    res
        .status(200)
        .json(new ApiResponse(200, "Product updated successfully", product));
});

export default editProduct;
