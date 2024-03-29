import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialProductDetailsState = {
  product: { name: null, image: null },
  loading: false,
  error: null,
};

export const getProductDetails = createAsyncThunk(
  'product/getProductDetails',
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
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

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: initialProductDetailsState,
  reducers: {
    clearProductDetailsData(state) {
      state.loading = false;
      state.product = { name: null, image: null };
      state.error = null;
    },
  },
  extraReducers: {
    // getProducts
    [getProductDetails.pending]: (state) => {
      state.loading = true;
    },
    [getProductDetails.fulfilled]: (state, { payload }) => {
      state.product = payload;
      state.loading = false;
      state.error = null;
    },
    [getProductDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.product = { name: null, image: null };
    },
  },
});

export const productDetailsActions = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
