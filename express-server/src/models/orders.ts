import mongoose from "mongoose";

interface Order {
    customerClerkId: string;
    products: {
        product: string;
        color: string;
        size: string;
        quantity: number;
    }[];
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    shippingRate: string;
    totalAmount: number;
}

const orderSchema = new mongoose.Schema({
  customerClerkId: String,
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      color: String,
      size: String,
      quantity: Number,
    },
  ],
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  shippingRate: String,
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;