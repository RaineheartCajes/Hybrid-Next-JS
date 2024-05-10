import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import { Box, CssBaseline, Grid, Container } from '@mui/material';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      <Navbar />
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}
        >
          <Container maxWidth="lg">
            {children}
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
