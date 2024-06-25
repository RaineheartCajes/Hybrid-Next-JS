"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../redux/reducer/userReducer';

interface User {
  id: string;
  username: string;
  email: string;
  shippingAddress: string; 
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUserState] = useState<User | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:2000/auth/login', { email, password });
      const userData = response.data;
      dispatch(setUser({
        id: userData.id,
        username: userData.username,
        email: userData.email,
        shippingAddress: userData.shippingAddress,
      }));
      setIsAuthenticated(true);
      setUserState(userData);
      router.push('/products');
    } catch (error) {
      throw new Error('Failed to sign in. Please check your credentials and try again.');
    }
  };

  const logout = () => {
    dispatch(clearUser());
    setIsAuthenticated(false);
    setUserState(null);
    router.push('/signin');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
