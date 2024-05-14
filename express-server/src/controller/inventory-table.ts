import express  from 'express';

import {updateProduct, deleteProduct} from '../models/products';

export const updateInventory = async (req: express.Request, res: express.Response) => {
    try {
        const { productId, productName, category, sizes, colors, quantity } = req.body;
        const updatedProduct = await updateProduct(productId, {
          productName,
          category,
          sizes,
          colors,
          quantity
        });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Failed to update inventory:', error);
        res.status(500).json({ message: "Error updating inventory" });
    }
};

export const deleteInventory = async (req: express.Request, res: express.Response) => {
    try {
        const { productId } = req.body;
        const deletedProduct = await deleteProduct(productId);
        res.status(200).json(deletedProduct);
    } catch (error) {
        console.error('Failed to delete inventory:', error);
        res.status(500).json({ message: "Error deleting inventory" });
    }
}