import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { RootState, AppDispatch } from '../../services/index';
import { removeFromCart, clearCart } from '../../services/reducer/cartReducer';
import { useAuth } from '../../auth/auth-context';

interface CartItem {
  _id: string;
  productName: string;
  price: number;
  quantity: number;
  media: string;
  color: string;
  size: string;
}

interface OrderData {
  customerId: string;
  products: {
    product: string;
    color: string;
    size: string;
    quantity: number;
  }[];
  shippingAddress: string;
  totalAmount: number;
}

const CartModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items) as CartItem[];
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const { isAuthenticated, user } = useAuth();
  const shippingAddress = useSelector((state: RootState) => state.user.shippingAddress);  

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated || !user) {
      console.error('User is not logged in');
      return;
    }

    const incompleteItems = cartItems.filter(item => !item.color || !item.size);
    if (incompleteItems.length > 0) {
      console.error('Some items in the cart are missing required fields.');
      return;
    }

    try {
      const orderData: OrderData = {
        customerId: user.id,
        products: cartItems.map(item => ({
          product: item._id,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
        })),
        shippingAddress, 
        totalAmount,
      };

      const response = await axios.post('http://localhost:2000/table/newOrder', orderData);
      console.log('Order placed successfully:', response.data);

      
      dispatch(clearCart()); 
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: 'white', borderRadius: 2, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <Typography variant="h6" component="h2" gutterBottom>Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty</Typography>
      ) : (
        <Box>
          {cartItems.map(item => (
            <Box key={item._id} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Image
                src={`http://localhost:2000/${item.media}`}
                alt={item.productName}
                width={100}
                height={100}
                layout="fixed"
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1">{item.productName}</Typography>
                <Typography variant="body2">Price: ${item.price}</Typography>
                <Typography variant="body2">Color: {item.color}</Typography>
                <Typography variant="body2">Size: {item.size}</Typography>
                <Typography variant="body2">Quantity: {item.quantity}</Typography>
                <Button variant="contained" color="secondary" onClick={() => handleRemoveFromCart(item._id)} sx={{ mt: 1 }}>
                  Remove
                </Button>
              </Box>
            </Box>
          ))}
          <Typography variant="h6" gutterBottom>Total Amount: ${totalAmount.toFixed(2)}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" sx={{ mr: 1 }} onClick={handlePlaceOrder}>Place Order</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CartModal;
