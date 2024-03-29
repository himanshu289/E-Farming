import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialOrderListMyState = {
  orders: [],
  loading: false,
  error: null,
};

export const getMyOrderList = createAsyncThunk(
  'order/getMyOrderList',
  async (_, { getState, rejectWithValue }) => {
    try {
      const userInfo = getState().user.userInfo;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders/myorders`, config);
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

const orderListMySlice = createSlice({
  name: 'orderListMy',
  initialState: initialOrderListMyState,
  reducers: {
    clearOrderListMyData(state) {
      state.loading = false;
      state.orders = [];
      state.error = null;
    },
  },
  extraReducers: {
    // getMyOrderList
    [getMyOrderList.pending]: (state) => {
      state.loading = true;
      state.orders = [];
      state.error = null;
    },
    [getMyOrderList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.orders = payload;
      state.error = null;
    },
    [getMyOrderList.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.orders = [];
    },
  },
});

export const orderListMyActions = orderListMySlice.actions;
export default orderListMySlice.reducer;
