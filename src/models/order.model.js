import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: { // Store the price at the time of purchase
        type: Number,
        required: true
    }
});


const shippingAddressSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
}, { _id: false });


const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema],
    shippingAddress: {
        type: shippingAddressSchema, // You can define a more specific schema for the address
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    deliveryCharge: {
        type: Number,
        required: true,
        default: 0
    },
    totalPayable: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"],
        default: "Pending"
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending" // For COD, it will remain pending until delivery confirmation
    }
}, {
    timestamps: true
});

export const Order = mongoose.model("Order", orderSchema);