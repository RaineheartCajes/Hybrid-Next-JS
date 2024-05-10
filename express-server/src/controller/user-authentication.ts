import express from 'express';
import { getUserByEmail, createUser } from '../models/customers'; // Ensure the path is correct
import { hashPassword, generateToken, comparePassword } from '../middleware'; // Middleware functions must be properly implemented

interface UserData {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

export const register = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { username, email, password, fullName } = req.body as UserData;
    
        if (!username || !email || !password || !fullName) {
            res.status(400).send('Missing required fields');
            return;
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            res.status(400).send('User already exists');
            return;
        }

        const hashedPassword = await hashPassword(password);
        const user = await createUser({
            username,
            email,
            password: hashedPassword,
            fullName
        });

        res.status(200).json({
            token: generateToken(user._id.toString()),
            username: user.username  
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
            
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
    
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const isPasswordMatch = await comparePassword(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const token = generateToken(user._id.toString());
        
        return res.status(200).json({ token, username: user.username });
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};
