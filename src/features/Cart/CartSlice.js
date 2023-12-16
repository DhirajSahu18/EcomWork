import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addItem, deleteItem, deleteUserItem, fetchCardbyUserID, updateItem }  from './CartAPI';

const initialState = {
  cart : [],
  useritems : [],
  status: 'idle',
};

export const addItemAsync = createAsyncThunk(
  'cart/addItem',
  async (item) => {
    const response = await addItem(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateItemAsync = createAsyncThunk(
  'cart/updateItem',
  async (item) => {
    const response = await updateItem(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteItemAsync = createAsyncThunk(
  'cart/deleteItem',
  async (productId) => {
    const response = await deleteItem(productId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteUserItemAsync = createAsyncThunk(
  'cart/deleteUserItem',
  async (userId) => {
    const response = await deleteUserItem(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchCardbyUserIDAsync = createAsyncThunk(
  'cart/fetchCardbyUserID',
  async (id) => {
    const response = await fetchCardbyUserID(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cart.push(action.payload);
      })
      .addCase(fetchCardbyUserIDAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCardbyUserIDAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.useritems = (action.payload);
      })
      .addCase(deleteUserItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUserItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const UserId = action.payload.uId
        state.cart = state.cart.filter(item => item.user !== UserId);
        state.useritems = state.useritems.filter(item => item.user !== UserId);
      })
      .addCase(deleteItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const Id = action.payload.id
        state.cart = state.cart.filter(item => item.id !== Id);
        state.useritems = state.useritems.filter(item => item.id !== Id);
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const itemid = action.payload
        const index = state.cart.findIndex(item=>item.id===itemid.id);
        state.cart[index] = action.payload;
        const index2 = state.useritems.findIndex(item=>item.id===itemid.id);
        state.useritems[index2] = action.payload;
      })
  },
});

export const { increment} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cart;
export const selectUserItems = (state) => state.cart.useritems;


export default cartSlice.reducer;
