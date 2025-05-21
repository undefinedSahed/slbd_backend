import { Router } from "express";
import addToCart from "../controllers/cart/addToCart.controllers.js";
import getCart from "../controllers/cart/getCart.controller.js";
import { authenticateUser } from "../middlewares/auth.middlewares.js";
import removeItemFromCart from "../controllers/cart/removeFromCart.controller.js";
import clearCart from "../controllers/cart/clearCart.controller.js";
import updateCartItemQuantity from "../controllers/cart/updateCart.controller.js";
// import updateCartItemQuantity from "../controllers/cart/updateCart.controller.js";

const router = Router();

// Add to cart route
router.post("/addtocart", authenticateUser, addToCart);

// Get user cart route
router.get("/", authenticateUser, getCart);

// Remove Item From Cart
router.post("/removeitem", authenticateUser, removeItemFromCart)


// Clear cart
router.post("/clear", authenticateUser, clearCart)


// Update Cart Items Quantity
router.put("/update", authenticateUser, updateCartItemQuantity)

export default router;