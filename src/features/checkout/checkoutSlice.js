import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAddresses } from './checkoutAPI'

const initialState = {
  addresses : [],
  orders : [],
  status: 'idle',
  currentAddress : null
};


export const fetchAddressesAsync = createAsyncThunk(
  'checkout/fetchAddresses',
  async (userId) => {
    const response = await fetchAddresses(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddressesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.addresses = action.payload;
      })
  },
});

export const { increment} = checkoutSlice.actions;

export const selectAddresses = (state) => state.checkout.addresses;


export default checkoutSlice.reducer;
