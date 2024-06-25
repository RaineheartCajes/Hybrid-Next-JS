import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string;
  username: string;
  email: string;
  shippingAddress: string;
}

const initialState: UserState = {
  id: '',
  username: '',
  email: '',
  shippingAddress: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.shippingAddress = action.payload.shippingAddress;
    },
    clearUser: (state) => {
      state.id = '';
      state.username = '';
      state.email = '';
      state.shippingAddress = ''; 
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
