import express from "express";
import { createProduct, getAllProducts } from "../models/products";

interface RequestWithFile extends express.Request {
  file?: Express.Multer.File;
  productName: string;
  description: string;
  category: string;
  sizes: string;
  colors: string;
  quantity: number;
  price: number;
  media: string[];
}

export const addProduct = async (
  req: RequestWithFile,
  res: express.Response
) => {
  try {
    const {
      productName,
      description,
      category,
      sizes,
      colors,
      price,
      quantity,
    } = req.body;
   
    const media = req.file ? req.file.filename : ""; 

    const productData = {
      productName,
      description,
      media: `uploads/${media}`,
      category,
      sizes: JSON.parse(sizes),
      colors: JSON.parse(colors),
      quantity,
      price,
    };

    const newProduct = await createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Failed to add product:", error);
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
};

export const getProductsList = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const searchTerm = req.query.search as string;
    const query = searchTerm
      ? { productName: { $regex: searchTerm, $options: "i" } }
      : {};
    const products = await getAllProducts(query);
    res.status(200).json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};
