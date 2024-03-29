import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialShippingAddressState = {
  shippingAddressInfo: { address: null, city: null, postalCode: null },
  success: false,
  loading: false,
  error: null,
};

export const getShippingAddress = createAsyncThunk(
  'shippingAddress/get',
  async (_, { getState, rejectWithValue }) => {
    try {
      const userInfo = getState().user.userInfo;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/shipping-address/${userInfo._id}`,
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

export const setShippingAddress = createAsyncThunk(
  'shippingAddress/set',
  async ({ city, address, postalCode }, { getState, rejectWithValue }) => {
    try {
      const userInfo = getState().user.userInfo;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/shipping-address/${userInfo._id}`,
        { city, address, postalCode },
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

const shippingAddressSlice = createSlice({
  name: 'shippingAddress',
  initialState: initialShippingAddressState,
  reducers: {},
  extraReducers: {
    // getShippingAddress
    [getShippingAddress.pending]: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.shippingAddressInfo.address = '';
      state.shippingAddressInfo.city = '';
      state.shippingAddressInfo.postalCode = '';
    },
    [getShippingAddress.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.shippingAddressInfo.address = payload?.address;
      state.shippingAddressInfo.city = payload?.city;
      state.shippingAddressInfo.postalCode = payload?.postalCode;
    },
    [getShippingAddress.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
      state.shippingAddressInfo.address = '';
      state.shippingAddressInfo.city = '';
      state.shippingAddressInfo.postalCode = '';
    },

    // setShippingAddress
    [setShippingAddress.pending]: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.shippingAddressInfo.address = '';
      state.shippingAddressInfo.city = '';
      state.shippingAddressInfo.postalCode = '';
    },
    [setShippingAddress.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.shippingAddressInfo.address = payload.address;
      state.shippingAddressInfo.city = payload.city;
      state.shippingAddressInfo.postalCode = payload.postalCode;
    },
    [setShippingAddress.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
      state.shippingAddressInfo.address = '';
      state.shippingAddressInfo.city = '';
      state.shippingAddressInfo.postalCode = '';
    },
  },
});

export const shippingAddressActions = shippingAddressSlice.actions;
export default shippingAddressSlice.reducer;
