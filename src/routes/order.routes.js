import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middlewares.js";
import processCheckout from "../controllers/order/order.controller.js";


const router = Router();


router.post("/", authenticateUser, processCheckout)


export default router