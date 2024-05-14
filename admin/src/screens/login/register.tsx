"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Corrected import
import { Container, TextField, Button, Typography, Box, CssBaseline, MenuItem } from '@mui/material';

interface UserData {
  username: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobileNumber: string;
  role: string;  // Added role to the user data interface
}

const Register: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',  // Initialize mobile number
    role: ''           // Initialize role
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Create a new object for submission, excluding the confirmPassword
    const { confirmPassword, ...submitData } = userData;
    try {
      const response = await axios.post('http://localhost:2000/auth/register', submitData);
      router.push('/login'); // Navigate to login page after successful registration
    } catch (error: any) {
      alert('Registration failed: ' + (error.response?.data?.message || 'An unexpected error occurred'));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={userData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            value={userData.fullName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={userData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="mobileNumber"
            label="Mobile Number"
            name="mobileNumber"
            autoComplete="tel"
            value={userData.mobileNumber}
            onChange={handleChange}
          />
          <TextField
            select
            label="Role"
            value={userData.role}
            onChange={handleChange}
            name="role"
            fullWidth
            required
            margin="normal"
          >
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            {/* Add more roles as needed */}
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={userData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
