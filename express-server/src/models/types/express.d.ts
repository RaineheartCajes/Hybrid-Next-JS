import { Request } from 'express';
import { Document } from 'mongoose';

interface User extends Document {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  mobileNumber: string;
  shippingAddress: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}