// src/models/Customer.ts
import mongoose from 'mongoose';

interface CustomerModel {
  username: string;
  fullName: string;
  email: string;
  password: string;
  mobileNumber: string;
  status: string;
  role: string;
  shippingAddress: string;
}

const CustomerSchema = new mongoose.Schema<CustomerModel>({
  username: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobileNumber: { type: String, required: false },
  status: { type: String },
  role: { type: String, required: true },
  shippingAddress: { type: String, required: false },
});

const Customer = mongoose.models.Customer || mongoose.model<CustomerModel>('Customer', CustomerSchema);

export const getAllCustomers = async () => {
  return await Customer.find();
};

export const getCustomerByEmail = async (email: string) => {
  return await Customer.findOne({ email });
};

export const createCustomer = async (data: CustomerModel) => {
  const customer = new Customer(data);
  await customer.save();
  return customer.toObject();
};

export const updateCustomer = async (id: string, data: Partial<CustomerModel>) => {
  return await Customer.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCustomer = async (id: string) => {
  return await Customer.findByIdAndDelete(id);
};

export default Customer;
