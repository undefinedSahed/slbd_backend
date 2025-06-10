// routes/product.routes.js
import { Router } from "express";
import createProduct from "../controllers/product/createProduct.controllers.js";
import getAllProducts from "../controllers/product/getProducts.controllers.js";
import { upload } from "../middlewares/multer.middleware.js"; // Assuming your multer middleware is in this path
import { authenticateUser } from "../middlewares/auth.middlewares.js";
import { getPopularProducts } from "../controllers/product/getPopularProduct.js";
import { getFeaturedProducts } from "../controllers/product/get-featured-product.js";
import { getSingleProduct } from "../controllers/product/get-single-product.js";
import { getRelatedProducts } from "../controllers/product/get-related-products.js";
import editProduct from "../controllers/product/editProduct.controller.js";
import deleteProduct from "../controllers/product/deleteProduct.controller.js";

const router = Router();

// Create a new product with thumbnail and images upload
router.post("/createproduct", authenticateUser, upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 3 }
]), createProduct);


// Edit product
router.put(
    "/edit/:id",
    authenticateUser,
    upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 10 }
    ]),
    editProduct
);


// Delete a product
router.delete("/delete/:id", authenticateUser, deleteProduct)

// Get all products
router.get("/", getAllProducts);
router.get("/popular", getPopularProducts);
router.get("/featured", getFeaturedProducts);
router.get("/related-products/:category", getRelatedProducts)
router.get("/:title", getSingleProduct);


export default router;