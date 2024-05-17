// store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import ordersReducer from '../redux/slice/orderReducer';
import productsReducer from '../redux/slice/productReducer';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    products: productsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// Custom hook to use the AppDispatch type in your components
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
