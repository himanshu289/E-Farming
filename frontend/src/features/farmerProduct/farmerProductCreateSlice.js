import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialFarmerProductCreateState = {
  farmerProduct: {},
  success: false,
  loading: false,
  error: null,
};

export const farmerProductCreate = createAsyncThunk(
  'farmerProduct/farmerProductCreate',
  async (
    { farmerId, productId, price, countInStock },
    { getState, rejectWithValue }
  ) => {
    try {
      const userInfo = getState().user.userInfo;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/farmer-products`,
        { farmerId, productId, price, countInStock },
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

const farmerProductCreateSlice = createSlice({
  name: 'farmerProductCreate',
  initialState: initialFarmerProductCreateState,
  reducers: {
    clearFarmerProductCreateData(state) {
      state.loading = false;
      state.farmerProduct = {};
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: {
    // farmerProductCreate
    [farmerProductCreate.pending]: (state) => {
      state.loading = true;
      state.farmerProduct = {};
      state.success = false;
      state.error = null;
    },
    [farmerProductCreate.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.farmerProduct = payload;
    },
    [farmerProductCreate.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
      state.farmerProduct = {};
    },
  },
});

export const farmerProductCreateActions = farmerProductCreateSlice.actions;
export default farmerProductCreateSlice.reducer;
