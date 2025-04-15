import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Product name is required"],
            trim: true
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
            trim: true
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: 1
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Product category is required"]
        },
        thumbnail: {
            type: String,
            default: "/default.webp"
        },
        images: [String],
        specs: {
            nominatedRatedVoltage: { type: String },
            outputVoltage: { type: String },
            luminousEfficiency: { type: String },
            lumensMaintenance: { type: String },
            efficiencyOfDriverCircuit: { type: String },
            colourOfLightOutput: { type: String },
            numberOfSMDModules: [{ type: Number }],
            inputCurrentVariation: { type: String },
            driver: { type: String },
            powerFactor: {type: Number},
            beamAngle: { type: String },
            CRI: { type: String },
            THD: { type: String },
            IPRating: { type: String },
            frequency: { type: String },
            colourTemperature: { type: String },
            materials: { type: String },
            lifeTime: { type: String },
            operationTemperature: { type: String },
            storageTemperature: { type: String },
            warranty: [{ type: String }]
        },
        stock: {
            type: String,
            enum: ["in stock", "out of stock"],
            default: "in stock",
            required: [true, "Product stock is required"],
            min: 0
        },
        sold: {
            type: Number,
            default: 0
        },
    },
    { timestamps: true }
)

export const Product = mongoose.model("Product", productSchema);