import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  UpdateProduct, createProduct, fetchAllBrands, fetchAllCategories, fetchAllProducts,fetchAllSelectedProduct,fetchProductsByFilters } from './ProductAPI';

const initialState = {
  products: [],
  status: 'idle',
  totalItems : 0,
  brands : [],
  cart : [],
  selectedProduct : null,
  categories : []
};


export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllSelectedProductAsync = createAsyncThunk(
  'product/fetchAllSelectedProduct',
  async (id) => {
    const response = await fetchAllSelectedProduct(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (productData) => {
    const response = await createProduct(productData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const UpdateProductAsync = createAsyncThunk(
  'product/UpdateProduct',
  async (productData) => {
    const response = await UpdateProduct(productData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllBrandssAsync = createAsyncThunk(
  'product/fetchAllBrands',
  async () => {
    const response = await fetchAllBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  'product/fetchAllCategories',
  async () => {
    const response = await fetchAllCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({filter , sort , pagination}) => {
    const response = await fetchProductsByFilters(filter , sort , pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct : (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchAllBrandssAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandssAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchAllSelectedProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllSelectedProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload)
      })
      .addCase(UpdateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex((item)=>item.id===action.payload.id)
        state.products[index] = action.payload
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectAllCategories = (state) => state.product.categories;
export const selectAllBrands = (state) => state.product.brands;
export const selecttotalItems = (state) => state.product.totalItems;
export const selectSelectedProduct = (state) => state.product.selectedProduct;
export const selectProductStatus = (state) => state.product.status;

export default productSlice.reducer;