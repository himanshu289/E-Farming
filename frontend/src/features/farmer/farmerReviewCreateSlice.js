import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialFarmerReviewCreateState = {
  success: false,
  loading: false,
  error: null,
};

export const farmerReviewCreate = createAsyncThunk(
  'farmer/farmerReviewCreate',
  async ({ farmerId, review }, { rejectWithValue, getState }) => {
    try {
      const userInfo = getState().user.userInfo;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/farmers/${farmerId}/reviews`,
        review,
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

const farmerReviewCreateSlice = createSlice({
  name: 'farmerReviewCreate',
  initialState: initialFarmerReviewCreateState,
  reducers: {
    clearFarmerReviewCreateData(state) {
      state.success = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    // farmerReviewCreate
    [farmerReviewCreate.pending]: (state) => {
      state.loading = true;
    },
    [farmerReviewCreate.fulfilled]: (state, { payload }) => {
      state.success = true;
      state.loading = false;
      state.error = null;
    },
    [farmerReviewCreate.rejected]: (state, { payload }) => {
      state.success = false;
      state.loading = false;
      state.error = payload;
    },
  },
});

export const farmerReviewCreateActions = farmerReviewCreateSlice.actions;
export default farmerReviewCreateSlice.reducer;
