import mongoose, { Schema} from "mongoose";

interface ProductModel{
    productName: string;
    description: string;
    media: string;
    category: string;
    sizes: string[];
    colors: string[];
    price: number;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const ProductSchema = new Schema<ProductModel>({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    media: { type: String}, // Changed from [String] to String
    category: { type: String, required: true },
    sizes: { type: [String], required: true },
    colors: { type: [String], required: true },
    quantity: { type: Number, required: true },
    price: { 
      type: Number, 
      required: true, 
      get: (v: number): number => parseFloat(v.toFixed(2))
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }, { toJSON: { getters: true, virtuals: true } });
  
  const Product = mongoose.model<ProductModel>("Product", ProductSchema);
export const getAllProducts = async () => {
    return await Product.find({});
};

export const getProductById = async (id: string) => {
    return await Product.findById(id);
};

export const createProduct = async (data: ProductModel) => {
    const product = new Product(data);
    await product.save();
    return product.toObject();
};

export const updateProduct = async (id: string, data: Partial<ProductModel>) => {
    return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id: string) => {
    return await Product.findByIdAndDelete(id);
};

export default Product;
