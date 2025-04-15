import mongoose, { Schema } from "mongoose";


const cartSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "user_id is missing"]
        },
        items: [
            {
                product_id: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: [true, "Product_id is missing"]
                },
                quantity: {
                    type: Number,
                    required: [true, "Quantity_id is missing"],
                    default: 1,
                    min: 1
                }
            }
        ]
    },
    { timestamps: true }
)

export const Cart = mongoose.model("Cart", cartSchema);