import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialProductsState = {
  products: [],
  loading: false,
  error: null,
  pages: null,
  page: null,
};

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async ({ keyword = '', pageNumber = '' }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {
    clearProductsData(state) {
      state.loading = false;
      state.products = [];
      state.error = null;
      state.pages = null;
      state.page = null;
    },
  },
  extraReducers: {
    // getProducts
    [getProducts.pending]: (state) => {
      state.loading = true;
      state.products = [];
      state.error = null;
      state.pages = null;
      state.page = null;
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.products = payload.products;
      state.pages = payload.pages;
      state.page = payload.page;
      state.loading = false;
      state.error = null;
    },
    [getProducts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.products = [];
      state.pages = null;
      state.page = null;
    },
  },
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
