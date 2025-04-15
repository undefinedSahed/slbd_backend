// controllers/product/createProduct.controllers.js
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Product } from "../../models/product.model.js";
import { ErrorResponse } from "../../utils/errorResponse.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import fs from "fs"; // Import the fs module

const createProduct = asyncHandler(async (req, res) => {
    // Validate request body
    const { title, description, price, category, specs, sold } = req.body;

    // Check if category with the same title already exists
    const existingProduct = await Product.findOne({ title });

    if (existingProduct) {
        return res.status(400).json(
            new ErrorResponse(400, "Product with the same title already exists")
        );
    }

    // Check if thumbnail and images files are present
    if (!req.files || !req.files.thumbnail || !req.files.images || req.files.images.length < 1) {
        return res.status(400).json(
            new ErrorResponse(400, "Please upload a thumbnail and at least one image")
        );
    }

    const thumbnailLocalPath = req.files.thumbnail[0]?.path;
    const imagesLocalPaths = req.files.images.map(file => file.path);

    let thumbnailCloudinaryResponse;
    let imagesCloudinaryResponses = [];

    // Upload thumbnail to Cloudinary
    if (thumbnailLocalPath) {
        thumbnailCloudinaryResponse = await uploadOnCloudinary(thumbnailLocalPath);
         // Remove local file after upload
        if (!thumbnailCloudinaryResponse) {
            return res.status(500).json(
                new ErrorResponse(500, "Failed to upload thumbnail to Cloudinary")
            );
        }
    }

    // Upload images to Cloudinary
    if (imagesLocalPaths && imagesLocalPaths.length > 0) {
        for (const imageLocalPath of imagesLocalPaths) {
            const imageCloudinaryResponse = await uploadOnCloudinary(imageLocalPath);
            fs.unlinkSync(imageLocalPath); // Remove local file after upload
            if (imageCloudinaryResponse) {
                imagesCloudinaryResponses.push(imageCloudinaryResponse.url);
            } else {
                // If one image upload fails, you might want to handle this differently
                // (e.g., rollback already uploaded images, return an error)
                console.error("Failed to upload one of the images to Cloudinary");
                return res.status(500).json(
                    new ErrorResponse(500, "Failed to upload one or more images to Cloudinary")
                );
            }
        }
    }

    const newProduct = new Product({
        title,
        description,
        price,
        category,
        thumbnail: thumbnailCloudinaryResponse?.url || null,
        images: imagesCloudinaryResponses,
        specs,
        sold
    });

    // Save the new product to the database and return the created product as a response
    const createdProduct = await newProduct.save();

    res.status(201).json(
        new ApiResponse(201, "Product created successfully", createdProduct)
    );
});

export default createProduct;