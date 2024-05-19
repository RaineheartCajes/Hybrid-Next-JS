// redux/slice/orderReducer.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Order {
  _id: string;
  customer: {
    fullName: string;
  };
  products: {
    product: {
      productName: string;
    };
    color: string;
    size: string;
    quantity: number;
  }[];
  shippingAddress: string;
  totalAmount: number;
  orderPlaced: boolean;
  status: string;
}

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk<
  Order[],
  string,
  { rejectValue: string }
>("orders/fetchOrders", async (searchTerm, { rejectWithValue }) => {
  try {
    const response = await axios.get<Order[]>(
      "http://localhost:2000/table/getOrders",
      {
        params: { search: searchTerm },
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Error fetching orders"
    );
  }
});

export const updateOrderStatus = createAsyncThunk<
  Order,
  { id: string; status: string },
  { rejectValue: string }
>("orders/updateOrderStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const response = await axios.put<Order>(
      `http://localhost:2000/table/updateOrderStatus/${id}`,
      { status }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Error updating order status"
    );
  }
});

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.orders = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.payload || "Failed to load orders";
        state.loading = false;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateOrderStatus.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.orders = state.orders.map((order) =>
            order._id === action.payload._id ? action.payload : order
          );
          state.loading = false;
        }
      )
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error = action.payload || "Failed to update order status";
        state.loading = false;
      });
  },
});

export default ordersSlice.reducer;
