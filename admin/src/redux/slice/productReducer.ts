import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  _id: string;
  productName: string;
  description: string;
  media: string;
  category: string;
  sizes: string[];
  colors: string[];
  price: number;
  quantity: number;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

// Async action for fetching products
export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Product[]>('http://localhost:2000/table/getProducts');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error fetching products");
    }
  }
);

// Async action for posting a new product
export const postProduct = createAsyncThunk<Product, FormData, { rejectValue: string }>(
  'products/postProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post<Product>('http://localhost:2000/table/addProducts', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error posting product");
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new fetch attempt
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload || "Failed to load products";
        state.loading = false;
      })
      .addCase(postProduct.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new post attempt
      })
      .addCase(postProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload); // Assuming the backend returns the newly added product
        state.loading = false;
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.error = action.payload || "Failed to post product";
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;
