import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialSubOrderDeliverState = {
  success: false,
  loading: false,
  error: null,
};

export const deliverSubOrder = createAsyncThunk(
  'order/deliverSubOrder',
  async ({ subOrderId }, { getState, rejectWithValue }) => {
    try {
      const userInfo = getState().user.userInfo;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/orders/suborder/${subOrderId}/deliver`,
        {},
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

const subOrderDeliverSlice = createSlice({
  name: 'subOrderDeliver',
  initialState: initialSubOrderDeliverState,
  reducers: {
    clearSubOrderDeliverData(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: {
    // deliverSubOrder
    [deliverSubOrder.pending]: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    [deliverSubOrder.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    [deliverSubOrder.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
  },
});

export const subOrderDeliverActions = subOrderDeliverSlice.actions;
export default subOrderDeliverSlice.reducer;
