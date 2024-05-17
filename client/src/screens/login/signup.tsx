"use client";

import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Container, TextField, Typography, MenuItem, CssBaseline, Alert } from '@mui/material';
import Layout from '@/layouts/layout'; // Ensure this is the correct path to your layout component

interface SignupFormData {
  username: string;
  fullname: string;
  email: string;
  password: string;
  repeatPassword: string;
  mobileNumber: string;
  role: 'admin' | 'user';
  shippingAddress: string; // Added shippingAddress field
}

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    username: '',
    fullname: '',
    email: '',
    password: '',
    repeatPassword: '',
    mobileNumber: '',
    role: 'user',
    shippingAddress: '' // Initialize shippingAddress
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:2000/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullname,
        mobileNumber: formData.mobileNumber,
        role: formData.role,
        shippingAddress: formData.shippingAddress // Include shippingAddress
      });
      setError(null);
      router.push('/signin');
    } catch (error: any) {
      setError('Failed to register user. ' + error.response?.data.message);
    }
  };

  return (
    <Layout>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
            borderRadius: 2,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            backgroundColor: 'white',
            width: '100%', // Use full width of the container
          }}
        >
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="dense" // smaller margin
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              size="small" // smaller field size
            />
            <TextField
              margin="dense"
              required
              fullWidth
              id="fullname"
              label="Full Name"
              name="fullname"
              autoComplete="name"
              value={formData.fullname}
              onChange={handleChange}
              size="small"
            />
            <TextField
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              size="small"
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              size="small"
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="repeatPassword"
              label="Repeat Password"
              type="password"
              id="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              size="small"
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="mobileNumber"
              label="Mobile Number"
              type="tel"
              id="mobileNumber"
              autoComplete="tel"
              value={formData.mobileNumber}
              onChange={handleChange}
              size="small"
            />
            <TextField
              margin="dense"
              required
              fullWidth
              select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              helperText="Please select your role"
              size="small"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </TextField>
            <TextField
              margin="dense"
              required
              fullWidth
              id="shippingAddress"
              label="Shipping Address"
              name="shippingAddress"
              autoComplete="shipping-address"
              value={formData.shippingAddress}
              onChange={handleChange}
              size="small"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default SignupPage;
