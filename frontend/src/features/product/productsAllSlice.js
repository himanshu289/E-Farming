import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialProductsAllState = {
  products: [],
  loading: false,
  error: null,
};

export const getProductsAll = createAsyncThunk(
  'product/getProductsAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/all`);
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

const productsAllSlice = createSlice({
  name: 'productsAll',
  initialState: initialProductsAllState,
  reducers: {
    clearProductsData(state) {
      state.loading = false;
      state.products = [];
      state.error = null;
    },
  },
  extraReducers: {
    // getProducts
    [getProductsAll.pending]: (state) => {
      state.loading = true;
      state.products = [];
      state.error = null;
    },
    [getProductsAll.fulfilled]: (state, { payload }) => {
      state.products = payload;
      state.loading = false;
      state.error = null;
    },
    [getProductsAll.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.products = [];
    },
  },
});

export const productsAllActions = productsAllSlice.actions;
export default productsAllSlice.reducer;
