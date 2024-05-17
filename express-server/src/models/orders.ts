import mongoose from 'mongoose';

interface Order {
  customer: mongoose.Schema.Types.ObjectId;
  orderPlaced: boolean;
  products: {
    product: mongoose.Schema.Types.ObjectId;
    color: string;
    size: string;
    quantity: number;
  }[];
  shippingAddress: string;
  totalAmount: number;
  status: string;
  createdAt?: Date;
}

const orderSchema = new mongoose.Schema<Order>({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  orderPlaced: {
    type: Boolean,
    required: true,
    default: false,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      color: { type: String, required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  shippingAddress: { type: String },
  totalAmount: { type: Number, required: true },
  status: { type: String, required: true, default: 'Pending' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model<Order>('Order', orderSchema);

export const getAllOrders = async () => {
  return await Order.find().populate('customer').populate('products.product');
};

export const getOrderById = async (id: string) => {
  return await Order.findById(id).populate('customer').populate('products.product');
};

export const createOrder = async (data: Order) => {
  const order = new Order(data);
  await order.save();
  return order.toObject();
};

export const updateOrder = async (id: string, data: Partial<Order>) => {
  return await Order.findByIdAndUpdate(id, data, { new: true }).populate('customer').populate('products.product');
};

export const deleteOrder = async (id: string) => {
  return await Order.findByIdAndDelete(id);
};

export default Order;
