import mongoose from "mongoose";

interface Product {
    productName: string;
    description: string;
    media: string[];
    category: string;
    sizes: string[];
    colors: string[];
    price: number;
    expense: number;
}

const ProductSchema = new mongoose.Schema({
  productName: String,
  description: String,
  media: [String],
  category: String,
  sizes: [String],
  colors: [String],
  price: { type: mongoose.Schema.Types.Decimal128, get: (v: mongoose.Schema.Types.Decimal128) => { return parseFloat(v.toString()) }},
  expense: { type: mongoose.Schema.Types.Decimal128, get: (v: mongoose.Schema.Types.Decimal128) => { return parseFloat(v.toString()) }},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true } });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;