"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Corrected import
import { TextField, Button, Container, Typography, CssBaseline, Box } from '@mui/material';
import axios from 'axios';

const Login = () => {
   const router = useRouter();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');

   const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
     setEmail(event.target.value);
   };

   const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
     setPassword(event.target.value);
   };

   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
     event.preventDefault();
     setError('');
     try {
       const response = await axios.post('http://localhost:2000/auth/login', { email, password });
       router.push('/overview'); // Adjust according to your routing needs
     } catch (error: any) {
       setError(error.response?.data?.message || 'An unexpected error occurred');
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
           Login
         </Typography>
         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
           <TextField
             margin="normal"
             required
             fullWidth
             id="email"
             label="Email Address"
             name="email"
             autoComplete="email"
             autoFocus
             value={email}
             onChange={handleEmailChange}
           />
           <TextField
             margin="normal"
             required
             fullWidth
             name="password"
             label="Password"
             type="password"
             id="password"
             autoComplete="current-password"
             value={password}
             onChange={handlePasswordChange}
           />
           <Button
             type="submit"
             fullWidth
             variant="contained"
             sx={{ mt: 3, mb: 2 }}
           >
             Login
           </Button>
           {error && <Typography color="error">{error}</Typography>}
         </Box>
       </Box>
     </Container>
   );
};

export default Login;
