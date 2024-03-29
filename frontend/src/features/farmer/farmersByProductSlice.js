import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialFarmersByProductState = {
  farmersByProduct: [],
  loading: false,
  error: null,
  pages: null,
  page: null,
};

export const getFarmersByProduct = createAsyncThunk(
  'farmer/getFarmersByProduct',
  async ({ id, keyword = '', pageNumber = '' }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/products/${id}/farmers?keyword=${keyword}&pageNumber=${pageNumber}`
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

const farmersByProductSlice = createSlice({
  name: 'farmersByProduct',
  initialState: initialFarmersByProductState,
  reducers: {},
  extraReducers: {
    // getFarmersByProduct
    [getFarmersByProduct.pending]: (state) => {
      state.loading = true;
      state.farmersByProduct = [];
      state.error = null;
      state.pages = null;
      state.page = null;
    },
    [getFarmersByProduct.fulfilled]: (state, { payload }) => {
      state.farmersByProduct = payload.farmersByProduct;
      state.pages = payload.pages;
      state.page = payload.page;
      state.loading = false;
      state.error = null;
    },
    [getFarmersByProduct.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.farmersByProduct = [];
      state.pages = null;
      state.page = null;
    },
  },
});

export const farmersByProductActions = farmersByProductSlice.actions;
export default farmersByProductSlice.reducer;
