import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialFarmerProductUpdateState = {
  farmerProduct: {},
  success: false,
  loading: false,
  error: null,
};

export const farmerProductUpdate = createAsyncThunk(
  'farmerProduct/farmerProductUpdate',
  async ({ id, price, countInStock }, { getState, rejectWithValue }) => {
    try {
      const userInfo = getState().user.userInfo;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/farmer-products/${id}`,
        { price, countInStock },
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

const farmerProductUpdateSlice = createSlice({
  name: 'farmerProductUpdate',
  initialState: initialFarmerProductUpdateState,
  reducers: {
    clearFarmerProductUpdateData(state) {
      state.loading = false;
      state.farmerProduct = {};
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: {
    // farmerProductUpdate
    [farmerProductUpdate.pending]: (state) => {
      state.loading = true;
      state.farmerProduct = {};
      state.success = false;
      state.error = null;
    },
    [farmerProductUpdate.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.farmerProduct = payload;
    },
    [farmerProductUpdate.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
      state.farmerProduct = {};
    },
  },
});

export const farmerProductUpdateActions = farmerProductUpdateSlice.actions;
export default farmerProductUpdateSlice.reducer;
