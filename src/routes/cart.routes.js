import { Router } from "express";
import addToCart from "../controllers/cart/addToCart.controllers.js";
import getCart from "../controllers/cart/getCart.controller.js";

const router = Router();

// Add to cart route
router.post("/addtocart", addToCart);

// Get user cart route
router.get("/", getCart)


export default router;