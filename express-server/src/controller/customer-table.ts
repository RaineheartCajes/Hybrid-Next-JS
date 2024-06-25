import express from "express";
import { getAllCustomers } from "../models/customers";  

export const getCustomerList = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const searchTerm = req.query.search as string;
    const query = searchTerm
      ? { fullName: { $regex: searchTerm, $options: "i" } } 
      : {};
    const customers = await getAllCustomers(query);
    
    const sanitizedCustomers = customers.map((customer) => {
      const { password, ...customerWithoutPassword } = customer.toObject();
      return customerWithoutPassword;
    });
    res.status(200).json(sanitizedCustomers);
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    res.status(500).json({ message: "Error retrieving customer data" });
  }
};
