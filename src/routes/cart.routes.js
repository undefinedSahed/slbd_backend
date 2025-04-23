import { Router } from "express";
import addToCart from "../controllers/cart/addToCart.controllers.js";
import getCart from "../controllers/cart/getCart.controller.js";
import { authenticateUser } from "../middlewares/auth.middlewares.js";
import removeItemFromCart from "../controllers/cart/removeFromCart.controller.js";

const router = Router();

// Add to cart route
router.post("/addtocart", authenticateUser, addToCart);

// Get user cart route
router.get("/", authenticateUser, getCart);

// Remove Item From Cart
router.post("/removeitem", authenticateUser, removeItemFromCart)

export default router;