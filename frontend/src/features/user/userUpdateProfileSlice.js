import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialUserUpdateProfileState = {
  userInfo: {},
  loading: false,
  error: null,
  success: null,
};

export const updateUserProfile = createAsyncThunk(
  'user/userProfile',
  async ({ user }, { getState, rejectWithValue }) => {
    try {
      const userInfo = getState().user.userInfo;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(`/api/users/profile`, user, config);
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

const userUpdateProfileSlice = createSlice({
  name: 'userUpdateProfile',
  initialState: initialUserUpdateProfileState,
  reducers: {},
  extraReducers: {
    // updateUserProfile
    [updateUserProfile.pending]: (state) => {
      state.loading = true;
      state.userInfo = null;
      state.error = null;
      state.success = null;
    },
    [updateUserProfile.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    [updateUserProfile.rejected]: (state, { payload }) => {
      state.userInfo = payload;
      state.loading = false;
      state.success = false;
      state.error = payload;
    },
  },
});

export const userUpdateProfileSliceActions = userUpdateProfileSlice.actions;
export default userUpdateProfileSlice.reducer;
