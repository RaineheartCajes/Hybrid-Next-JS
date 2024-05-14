import express from 'express';
import { getAllCustomers } from '../models/customers'; // Adjust the import path according to your project structure

export const getCustomerList = async (req: express.Request, res: express.Response) => {
    try {
        const customers = await getAllCustomers();
        // Assuming you want to modify or hide the password and maybe other sensitive fields before sending
        const sanitizedCustomers = customers.map(customer => {
            const { password, ...customerWithoutPassword } = customer.toObject();
            return customerWithoutPassword;
        });
        res.status(200).json(sanitizedCustomers);
    } catch (error) {
        console.error('Failed to fetch customers:', error);
        res.status(500).json({ message: "Error retrieving customer data" });
    }
}