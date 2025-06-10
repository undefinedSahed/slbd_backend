import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

// Common middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(cookieParser())

app.use(express.json({
    limit: "16kb"
}));

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));


// Import routes
import UserRoute from "./routes/user.routes.js";
import CategoryRoute from "./routes/category.routes.js";
import ProductRoute from "./routes/product.routes.js";
import CartRoute from "./routes/cart.routes.js"
import BlogRoute from "./routes/blog.routes.js";
import OrderRoute from "./routes/order.routes.js";
import adminStatsRoute from "./routes/adminStats.routes.js";



// Routes
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/categories", CategoryRoute);
app.use("/api/v1/products", ProductRoute);
app.use("/api/v1/cart", CartRoute);
app.use("/api/v1/blogs", BlogRoute);
app.use("/api/v1/orders", OrderRoute)
app.use("/api/v1/admin", adminStatsRoute)

export { app };