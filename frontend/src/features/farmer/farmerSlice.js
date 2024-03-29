import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialFarmerState = {
  farmer: {},
  loading: false,
  error: null,
};

export const getFarmer = createAsyncThunk(
  'farmer/getFarmer',
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/farmers/${id}`);
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

const farmerSlice = createSlice({
  name: 'farmer',
  initialState: initialFarmerState,
  reducers: {
    clearFarmerData(state) {
      state.loading = false;
      state.farmer = {};
      state.error = null;
    },
  },
  extraReducers: {
    // getFarmer
    [getFarmer.pending]: (state) => {
      state.loading = true;
    },
    [getFarmer.fulfilled]: (state, { payload }) => {
      state.farmer = payload;
      state.loading = false;
      state.error = null;
    },
    [getFarmer.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.farmer = {};
    },
  },
});

export const farmerActions = farmerSlice.actions;
export default farmerSlice.reducer;
