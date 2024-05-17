import express from 'express';
import Order, { createOrder, updateOrder } from '../models/orders';
import Customer from '../models/customers';

export const createNewOrder = async (req: express.Request, res: express.Response) => {
  try {
    const { customerId, products, shippingAddress, totalAmount } = req.body;

    if (!customerId) {
      return res.status(400).send('Customer ID is required');
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).send('Customer not found');
    }

    if (!products || products.length === 0) {
      return res.status(400).send('Products are required');
    }

    for (const product of products) {
      if (!product.color || !product.size) {
        return res.status(400).send('Product color and size are required');
      }
    }

    if (!shippingAddress) {
      return res.status(400).send('Shipping address is required');
    }

    const newOrder = await createOrder({
      customer: customerId,
      orderPlaced: true,
      products,
      shippingAddress,
      totalAmount,
      status: 'Pending',
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating new order:', error);
    res.status(500).send('Server error: ' + error.message);
  }
};

export const getAllOrders = async (req: express.Request, res: express.Response) => {
  try {
    const orders = await Order.find().populate('customer').populate('products.product');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).send('Server error: ' + error.message);
  }
};

export const updateOrderStatus = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await updateOrder(id, { status });
    if (!updatedOrder) {
      return res.status(404).send('Order not found');
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).send('Server error: ' + error.message);
  }
};
