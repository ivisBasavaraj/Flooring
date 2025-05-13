import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  type: 'info', // 'error', 'warning', 'info', 'success'
  open: false
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || 'info';
      state.open = true;
    },
    clearAlert: (state) => {
      state.open = false;
    }
  }
});

export const { setAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer; 