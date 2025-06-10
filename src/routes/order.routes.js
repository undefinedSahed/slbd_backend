import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middlewares.js";
import getUserOrders from "../controllers/order/getUserOrder.controller.js";
import getOrderDetails from "../controllers/order/getOrderDetails.controller.js";
import getAllOrders from "../controllers/order/getAllOrders.controller.js";
import createOrder from "../controllers/order/createOrder.controller.js";
import updateOrderStatus from "../controllers/order/updateOrderStatus.controller.js";


const router = Router();

// Create order
router.post("/", authenticateUser, createOrder)

// Get user orders
router.get("/user", authenticateUser, getUserOrders)

// Get all orders as admin
router.get("/all", authenticateUser, getAllOrders)

// Get specific order details
router.get("/:orderId", getOrderDetails)


// Update Order Status
router.post("/update/:orderId", authenticateUser, updateOrderStatus)


export default router