import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from '../features/Product/ProductSlice';
import authReducer from '../features/Auth/AuthSlice';
import cartReducer from '../features/Cart/CartSlice';
import checkoutReducer from '../features/checkout/checkoutSlice';
import OrderReducer from '../features/Orders/OrdersSlice';

export const store = configureStore({
  reducer: {
    product : ProductReducer,
    auth : authReducer,
    cart : cartReducer,
    checkout : checkoutReducer,
    orders : OrderReducer
  },
});
