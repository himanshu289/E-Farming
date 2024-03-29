import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialProductUpdateState = {
  product: {},
  success: false,
  loading: false,
  error: null,
};

export const productUpdate = createAsyncThunk(
  'product/productUpdate',
  async ({ product }, { getState, rejectWithValue }) => {
    try {
      const userInfo = getState().user.userInfo;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        config
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

const productUpdateSlice = createSlice({
  name: 'productUpdate',
  initialState: initialProductUpdateState,
  reducers: {
    clearProductUpdateData(state) {
      state.loading = false;
      state.product = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: {
    // productUpdate
    [productUpdate.pending]: (state) => {
      state.loading = true;
      state.product = null;
      state.success = false;
      state.error = null;
    },
    [productUpdate.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.product = payload;
    },
    [productUpdate.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
      state.product = null;
    },
  },
});

export const productUpdateActions = productUpdateSlice.actions;
export default productUpdateSlice.reducer;
