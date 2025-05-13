import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAlert } from '../alert/alertSlice';
import { setAuthToken } from '../../utils/setAuthToken';

// Load User
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');
      return res.data;
    } catch (err) {
      localStorage.removeItem('token');
      return rejectWithValue(err.response.data.msg);
    }
  }
);

// Register User
export const register = createAsyncThunk(
  'auth/register',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post('/api/users', formData);
      
      localStorage.setItem('token', res.data.token);
      dispatch(loadUser());
      dispatch(setAlert({ message: 'Registration successful! Welcome to EventElite', type: 'success' }));
      
      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert({ message: error.msg, type: 'error' })));
      }

      return rejectWithValue(errors);
    }
  }
);

// Login User
export const login = createAsyncThunk(
  'auth/login',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post('/api/auth', formData);
      
      localStorage.setItem('token', res.data.token);
      dispatch(loadUser());
      
      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert({ message: error.msg, type: 'error' })));
      }

      return rejectWithValue(errors);
    }
  }
);

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.user = null;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(register.rejected, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer; 