import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {SignOut, UpdateUser, checkUser, createUser} from './AuthAPI';

const initialState = {
  loggedInUser : null,
  status: 'idle',
  error : null
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const UpdateUserAsync = createAsyncThunk(
  'user/Updateuser',
  async (userData) => {
    const response = await UpdateUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const SignOutAsync = createAsyncThunk(
  'user/SignOut',
  async () => {
    const response = await SignOut();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (userData) => {
    try {
      const response = await checkUser(userData);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
      const response = await checkUser(userData);
      return response.error
    }
  }
);

export const AuthSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.status = 'idle';
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.status = 'idle';
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.error = action.error;
        state.status = 'idle';
      })
      .addCase(UpdateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.status = 'idle';
      })
      .addCase(SignOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(SignOutAsync.fulfilled, (state, action) => {
        state.loggedInUser = null;
        state.status = 'idle';
      })
  },
});

export const { increment} = AuthSlice.actions;

export const selectUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;


export default AuthSlice.reducer;
