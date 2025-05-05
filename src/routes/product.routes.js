// routes/product.routes.js
import { Router } from "express";
import createProduct from "../controllers/product/createProduct.controllers.js";
import getAllProducts from "../controllers/product/getProducts.controllers.js";
import { upload } from "../middlewares/multer.middleware.js"; // Assuming your multer middleware is in this path
import { authenticateUser } from "../middlewares/auth.middlewares.js";
import { getPopularProducts } from "../controllers/product/getPopularProduct.js";
import { getFeaturedProducts } from "../controllers/product/get-featured-product.js";
import { getSingleProduct } from "../controllers/product/get-single-product.js";

const router = Router();

// Create a new product with thumbnail and images upload
router.post("/createproduct", authenticateUser, upload.fields([
    { name: 'thumbnail', maxCount: 1 }, // 'thumbnail' is the field name for the thumbnail image, allow 1 file
    { name: 'images', maxCount: 10 }    // 'images' is the field name for the product images, allow up to 10 files (adjust as needed)
]), createProduct);

// Get all products
router.get("/", getAllProducts);
router.get("/popular", getPopularProducts);
router.get("/featured", getFeaturedProducts);
router.get("/:id", getSingleProduct);


export default router;