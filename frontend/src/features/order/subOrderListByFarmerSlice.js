import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialSubOrderListByFarmerState = {
  subOrders: [],
  loading: false,
  error: null,
};

export const getSubOrderListByFarmer = createAsyncThunk(
  'order/getSubOrderListByFarmer',
  async ({ farmerId }, { getState, rejectWithValue }) => {
    try {
      const userInfo = getState().user.userInfo;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/orders/suborders/${farmerId}`,
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

const subOrderListByFarmerSlice = createSlice({
  name: 'subOrderListByFarmer',
  initialState: initialSubOrderListByFarmerState,
  reducers: {
    clearSubOrderListByFarmerData(state) {
      state.loading = false;
      state.subOrders = [];
      state.error = null;
    },
  },
  extraReducers: {
    // getSubOrderListByFarmer
    [getSubOrderListByFarmer.pending]: (state) => {
      state.loading = true;
    },
    [getSubOrderListByFarmer.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.subOrders = payload;
      state.error = null;
    },
    [getSubOrderListByFarmer.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.subOrders = [];
    },
  },
});

export const subOrderListByFarmerActions = subOrderListByFarmerSlice.actions;
export default subOrderListByFarmerSlice.reducer;
