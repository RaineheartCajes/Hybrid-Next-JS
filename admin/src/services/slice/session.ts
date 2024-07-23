import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  token: string | null;
  username: string | null;
}

const initialState: SessionState = {
  token: null,
  username: null
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<{ token: string, username: string }>) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    clearSession: (state) => {
      state.token = null;
      state.username = null;
    }
  }
});

export const { setSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
