import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialProductCreateState = {
  product: {},
  success: false,
  loading: false,
  error: null,
};

export const productCreate = createAsyncThunk(
  'product/productCreate',
  async (_, { getState, rejectWithValue }) => {
    try {
      const userInfo = getState().user.userInfo;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/products`, {}, config);
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

const productCreateSlice = createSlice({
  name: 'productCreate',
  initialState: initialProductCreateState,
  reducers: {
    clearProductCreateData(state) {
      state.loading = false;
      state.product = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: {
    // createProduct
    [productCreate.pending]: (state) => {
      state.loading = true;
      state.product = null;
      state.success = false;
      state.error = null;
    },
    [productCreate.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.product = payload;
    },
    [productCreate.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
      state.product = null;
    },
  },
});

export const productCreateActions = productCreateSlice.actions;
export default productCreateSlice.reducer;
