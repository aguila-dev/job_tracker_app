import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { getBackendUrl } from '@/utils/getBackendUrl';

// Get the backend URL
const BACKEND_URL = getBackendUrl();

// Define the user state interface
export interface Auth0User {
  id?: number;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  auth0ProviderId?: string;
  picture?: string;
  sub?: string;
  role?: string;
  authenticated?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Define the auth state
interface Auth0State {
  user: Auth0User | null;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

// Initial state
const initialState: Auth0State = {
  user: null,
  isLoading: false,
  error: null,
  token: null
};

// Async thunk to fetch user from backend
export const fetchBackendUser = createAsyncThunk(
  'auth0/fetchBackendUser',
  async ({ email, token, sub }: { email: string; token: string; sub?: string }, { rejectWithValue }) => {
    try {
      // First, try to check if the user exists
      const checkResponse = await axios.get(`${BACKEND_URL}/v1/auth/checkUser`, {
        params: { 
          email,
          userId: sub || 'auth0-user'
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (checkResponse.status === 200) {
        return checkResponse.data;
      }
      
      return null;
    } catch (error: any) {
      if (error.response?.status === 404) {
        // User not found, try to create one
        try {
          const createResponse = await axios.post(
            `${BACKEND_URL}/v1/auth/signup`,
            {
              email,
              firstName: email.split('@')[0],
              lastName: 'User',
              userId: sub || 'auth0-user'
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          
          return createResponse.data;
        } catch (createError: any) {
          return rejectWithValue(createError.response?.data?.message || 'Failed to create user');
        }
      }
      
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

// Create the auth slice
const auth0Slice = createSlice({
  name: 'auth0',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Auth0User | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBackendUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBackendUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchBackendUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

// Export actions and reducer
export const { setUser, setToken, clearAuth } = auth0Slice.actions;
export default auth0Slice.reducer;