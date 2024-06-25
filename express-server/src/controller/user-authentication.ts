import express from 'express';
import { getCustomerByEmail, createCustomer } from '../models/customers'; 
import { hashPassword, generateToken, comparePassword } from '../middleware'; 


interface CustomerData {
    username: string;
    email: string;
    password: string;
    fullName: string;
    mobileNumber?: string;  
    status?: string;       
    role: string;
    shippingAddress?: string;
  }

  export const register = async (req: express.Request, res: express.Response) => {
    const { username, email, password, fullName, mobileNumber, status, role, shippingAddress } = req.body as CustomerData;

    if (!username || !email || !password || !fullName || !role) { 
        res.status(400).send('Missing required fields');
        return;
    }

    const existingUser = await getCustomerByEmail(email);
    if (existingUser) {
        res.status(400).send('Customer already exists');
        return;
    }

    const hashedPassword = await hashPassword(password);
    const newCustomer = await createCustomer({
        username,
        email,
        password: hashedPassword,
        fullName,
        mobileNumber,
        status,
        role,
        shippingAddress 
    });

    res.status(201).json({
        id: newCustomer._id,
        username: newCustomer.username,
        email: newCustomer.email,
        role: newCustomer.role,  
        shippingAddress: newCustomer.shippingAddress 
    });
};


export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
            
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
    
        const user = await getCustomerByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const isPasswordMatch = await comparePassword(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const token = generateToken(user._id.toString());
        
        return res.status(200).json({
            id: user._id,
            token,
            username: user.username,
            email: user.email,
            mobileNumber: user.mobileNumber,
            status: user.status,
            shippingAddress: user.shippingAddress 
        });
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};
