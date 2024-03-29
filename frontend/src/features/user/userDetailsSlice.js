import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialUserDetailsState = {
  user: {},
  loading: false,
  error: null,
};

export const getUserDetails = createAsyncThunk(
  'user/userDetails',
  async (_, { getState, rejectWithValue }) => {
    try {
      const userInfo = getState().user.userInfo;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/users/profile`, config);
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

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: initialUserDetailsState,
  reducers: {
    clearUserDetailsData(state) {
      state.loading = false;
      state.user = {};
      state.error = null;
    },
  },
  extraReducers: {
    // getUserDetails
    [getUserDetails.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      state.error = null;
    },
    [getUserDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.user = null;
    },
  },
});

export const userDetailsActions = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
