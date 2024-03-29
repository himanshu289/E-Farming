import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialFarmerProductDetailsState = {
  farmerProduct: {},
  loading: false,
  error: null,
};

export const getFarmerProductDetails = createAsyncThunk(
  'farmerProduct/getFarmerProductDetails',
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/farmer-products/${id}`);
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

const farmerProductDetailsSlice = createSlice({
  name: 'farmerProductDetails',
  initialState: initialFarmerProductDetailsState,
  reducers: {
    clearFarmerProductDetailsData(state) {
      state.loading = false;
      state.farmerProduct = {};
      state.error = null;
    },
  },
  extraReducers: {
    // getFarmerProductDetails
    [getFarmerProductDetails.pending]: (state) => {
      state.loading = true;
    },
    [getFarmerProductDetails.fulfilled]: (state, { payload }) => {
      state.farmerProduct = payload;
      state.loading = false;
      state.error = null;
    },
    [getFarmerProductDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.farmerProduct = {};
    },
  },
});

export const farmerProductDetailsActions = farmerProductDetailsSlice.actions;
export default farmerProductDetailsSlice.reducer;
