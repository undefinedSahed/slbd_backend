import dotenv from "dotenv"
dotenv.config(
    {
        path: "./.env"
    }
);

import { app } from "./app.js";
import dbConnect from "./db/config.js";

const PORT = process.env.PORT || 4000;

dbConnect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Database connection error", error)
    });