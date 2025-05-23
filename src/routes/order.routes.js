import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middlewares.js";
import processCheckout from "../controllers/order/createOrder.controller.js";
import getUserOrders from "../controllers/order/getUserOrder.controller.js";
import getOrderDetails from "../controllers/order/getOrderDetails.controller.js";


const router = Router();

// Create order
router.post("/", authenticateUser, processCheckout)

// Get user orders
router.get("/user", authenticateUser, getUserOrders)

// Get specific order details
router.get("/:orderId", authenticateUser, getOrderDetails)

export default router