"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Modal, Box, Button } from '@mui/material';
import CartModal from '../screens/nav/cart';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/index'; 
import { useAuth } from '../components/auth-context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavBar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = useSelector((state: RootState) => state.cart.totalQuantity);
  const { isAuthenticated, logout } = useAuth();
  const username = useSelector((state: RootState) => state.user.username); 

  const handleCartClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login first to open the Cart');
      return;
    }
    setIsCartOpen(true);
  };

  const handleClose = () => setIsCartOpen(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <div className={styles.logo}>
          <Link href="/">SHOE SHOP by Raineheart</Link>
          {isAuthenticated && <span className={styles.welcomeMessage}>Welcome, {username}</span>}
        </div>
        <div className={styles.links}>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contacts">Contact</Link>
          {isAuthenticated ? (
            <Button onClick={logout} sx={{ color: 'inherit' }}>
              Logout
            </Button>
          ) : (
            <>
              <Link href="/signin">Sign in</Link>
              <Link href="/signup">Sign Up</Link>
            </>
          )}
          <div className={styles.cartIcon} onClick={handleCartClick}>
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </div>
        </div>
      </div>
      <Modal
        open={isCartOpen}
        onClose={handleClose}
        aria-labelledby="cart-modal-title"
        aria-describedby="cart-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, outline: 'none' }}>
          <CartModal />
        </Box>
      </Modal>
      <ToastContainer />
    </nav>
  );
}

export default NavBar;