import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchUserOrder } from './OrdersAPI';

const initialState = {
  orders : [],
  status: 'idle',
  currentOrder : []
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (orderData) => {
    const response = await createOrder(orderData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchUserOrderAsync = createAsyncThunk(
  'order/fetchUserOrder',
  async (userId) => {
    const response = await fetchUserOrder(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const OrdersSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setNull : (state) => {
      state.currentOrder = [];
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createOrderAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(createOrderAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.orders.push(action.payload);
      state.currentOrder = action.payload
    })
    .addCase(fetchUserOrderAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchUserOrderAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.orders = (action.payload);
    })
  },
});

export const { setNull } = OrdersSlice.actions;

export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectOrders = (state) => state.orders.orders;


export default OrdersSlice.reducer;
