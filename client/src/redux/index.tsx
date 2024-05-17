import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducer/productReducer';
import cartReducer from './reducer/cartReducer';
import userReducer from './reducer/userReducer';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;