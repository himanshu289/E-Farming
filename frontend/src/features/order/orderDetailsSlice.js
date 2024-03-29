import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialOrderDetailsState = {
  order: { user: {}, shippingAddress: {}, orderItems: [], subOrders: [] },
  loading: false,
  error: null,
};

export const getOrderDetails = createAsyncThunk(
  'order/getOrderDetails',
  async ({ orderId }, { getState, rejectWithValue }) => {
    try {
      const userInfo = getState().user.userInfo;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders/${orderId}`, config);
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

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: initialOrderDetailsState,
  reducers: {},
  extraReducers: {
    // getOrderDetails
    [getOrderDetails.pending]: (state) => {
      state.loading = true;
      state.order = {};
      state.error = null;
    },
    [getOrderDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.order = payload;
      state.error = null;
    },
    [getOrderDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.order = {};
    },
  },
});

export const orderDetailsActions = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
