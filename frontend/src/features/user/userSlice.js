import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartActions } from '../cart/cartSlice';
import { userDetailsActions } from '../user/userDetailsSlice';
import { orderListMyActions } from '../order/orderListMySlice';
import axios from 'axios';

const initialUserState = {
  userInfo: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'user/userLogin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
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

export const logout = createAsyncThunk(
  'user/userLogout',
  async (_, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('cartItems');
      dispatch(cartActions.clearCartData());
      dispatch(userDetailsActions.clearUserDetailsData());
      dispatch(orderListMyActions.clearOrderListMyData());
      document.location.href = '/login';
      return fulfillWithValue();
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerCustomer = createAsyncThunk(
  'user/userRegisterCustomer',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/users/register/customer',
        { name, email, password },
        config
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
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

export const registerFarmer = createAsyncThunk(
  'user/userRegisterFarmer',
  async ({ name, email, password, farmName, image }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/users/register/farmer',
        { name, email, password, farmName, image },
        config
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
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

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    clearUserData(state) {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    // login
    [login.pending]: (state) => {
      state.loading = true;
      state.userInfo = null;
      state.error = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.loading = false;
      state.error = null;
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.userInfo = null;
    },

    // logout
    [logout.pending]: (state) => {
      state.loading = true;
      state.userInfo = null;
      state.error = null;
    },
    [logout.fulfilled]: (state) => {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
    },
    [logout.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.userInfo = null;
    },

    // registerCustomer
    [registerCustomer.pending]: (state) => {
      state.loading = true;
      state.userInfo = null;
      state.error = null;
    },
    [registerCustomer.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.loading = false;
      state.error = null;
    },
    [registerCustomer.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.userInfo = null;
    },

    // registerFarmer
    [registerFarmer.pending]: (state) => {
      state.loading = true;
      state.userInfo = null;
      state.error = null;
    },
    [registerFarmer.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.loading = false;
      state.error = null;
    },
    [registerFarmer.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.userInfo = null;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
