import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialSubOrderDetailsState = {
  subOrder: {
    user: {},
    orderItems: [],
    shippingAddress: {},
    totalPrice: null,
  },
  loading: false,
  error: null,
};

export const getSubOrderDetails = createAsyncThunk(
  'order/getSubOrderDetails',
  async ({ orderId, subOrderId }, { getState, rejectWithValue }) => {
    try {
      const userInfo = getState().user.userInfo;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/orders/${orderId}/suborder/${subOrderId}`,
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

const subOrderDetailsSlice = createSlice({
  name: 'subOrderDetails',
  initialState: initialSubOrderDetailsState,
  reducers: {},
  extraReducers: {
    // getSubOrderDetails
    [getSubOrderDetails.pending]: (state) => {
      state.loading = true;
      state.subOrder = {};
      state.error = null;
    },
    [getSubOrderDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.subOrder = payload;
      state.error = null;
    },
    [getSubOrderDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.subOrder = {};
    },
  },
});

export const subOrderDetailsActions = subOrderDetailsSlice.actions;
export default subOrderDetailsSlice.reducer;
