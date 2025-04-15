import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Category title is required"],
            trim: true,
            index: true
        },
        description: {
            type: String,
            required: [true, "Category description is required"],
            trim: true,
            minlength: [10, "Description must be at least 10 characters long"],
            maxlength: [500, "Description cannot exceed 500 characters"]
        },        
        image: {
            type: String,
            default: "/default.webp"
        },
        products: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Product"
                }
            ],
            default: []
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);