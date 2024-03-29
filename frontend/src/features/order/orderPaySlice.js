import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialOrderPayState = {
  success: false,
  loading: false,
  error: null,
};

export const payOrder = createAsyncThunk(
  'order/payOrder',
  async ({ orderId, paymentResult }, { getState, rejectWithValue }) => {
    try {
      const userInfo = getState().user.userInfo;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
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

const orderPaySlice = createSlice({
  name: 'orderPay',
  initialState: initialOrderPayState,
  reducers: {
    orderPayReset(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: {
    // payOrder
    [payOrder.pending]: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    [payOrder.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    [payOrder.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
  },
});

export const orderPayActions = orderPaySlice.actions;
export default orderPaySlice.reducer;
