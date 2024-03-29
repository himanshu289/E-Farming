import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialProductsByFarmerState = {
  productsByFarmer: [],
  loading: false,
  error: null,
  pages: null,
  page: null,
};

export const getProductsByFarmer = createAsyncThunk(
  'product/getProductsByFarmer',
  async ({ id, keyword = '', pageNumber = '' }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/farmers/${id}/products?keyword=${keyword}&pageNumber=${pageNumber}`
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

const productsByFarmerSlice = createSlice({
  name: 'productsByFarmer',
  initialState: initialProductsByFarmerState,
  reducers: {
    clearProductsByFarmerData(state) {
      state.loading = false;
      state.productsByFarmer = [];
      state.error = null;
      state.pages = null;
      state.page = null;
    },
  },
  extraReducers: {
    //getProductsByFarmer
    [getProductsByFarmer.pending]: (state) => {
      state.loading = true;
      state.productsByFarmer = [];
      state.error = null;
      state.pages = null;
      state.page = null;
    },
    [getProductsByFarmer.fulfilled]: (state, { payload }) => {
      state.productsByFarmer = payload.productsByFarmer;
      state.pages = payload.pages;
      state.page = payload.page;
      state.loading = false;
      state.error = null;
    },
    [getProductsByFarmer.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.productsByFarmer = [];
      state.pages = null;
      state.page = null;
    },
  },
});

export const productsByFarmerActions = productsByFarmerSlice.actions;
export default productsByFarmerSlice.reducer;
