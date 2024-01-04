import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UpdateOrder, createOrder, fetchAllOrders, fetchUserOrder } from './OrdersAPI';

const initialState = {
  orders : [],
  AllOrders : [],
  status: 'idle',
  currentOrder : [],
  totalItems : 0
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (orderData) => {
    const response = await createOrder(orderData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const UpdateOrderAsync = createAsyncThunk(
  'order/UpdateOrder',
  async (orderData) => {
    const response = await UpdateOrder(orderData);
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

export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({sort , pagination}) => {
    const response = await fetchAllOrders({sort , pagination});
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
    .addCase(UpdateOrderAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(UpdateOrderAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      const index = state.AllOrders.findIndex(item=>item.id===action.payload.id)
      state.AllOrders[index] = (action.payload);
    })
    .addCase(fetchUserOrderAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchUserOrderAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.orders = (action.payload);
    })
    .addCase(fetchAllOrdersAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.AllOrders = (action.payload.orders);
      state.totalItems = (action.payload.totalItems)
    })
  },
});

export const { setNull } = OrdersSlice.actions;

export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectOrders = (state) => state.orders.orders;
export const selectAllOrders = (state) => state.orders.AllOrders;
export const selectOrderTotalNUm = (state) => state.orders.totalItems


export default OrdersSlice.reducer;
