import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import projectReducer from '../features/projects/projectSlice';
import alertReducer from '../features/alert/alertSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    alert: alertReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
}); 