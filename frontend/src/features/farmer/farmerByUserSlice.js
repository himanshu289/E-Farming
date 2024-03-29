import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialFarmerByUserState = {
  farmer: {},
  loading: false,
  error: null,
};

export const getFarmerByUser = createAsyncThunk(
  'farmer/getFarmerByUser',
  async ({ id }, { rejectWithValue, getState }) => {
    try {
      const userInfo = getState().user.userInfo;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/farmers/user/${id}`, config);
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

const farmerByUserSlice = createSlice({
  name: 'farmerByUser',
  initialState: initialFarmerByUserState,
  reducers: {},
  extraReducers: {
    // getFarmerByUser
    [getFarmerByUser.pending]: (state) => {
      state.loading = true;
      state.farmer = {};
      state.error = null;
    },
    [getFarmerByUser.fulfilled]: (state, { payload }) => {
      state.farmer = payload;
      state.loading = false;
      state.error = null;
    },
    [getFarmerByUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.farmer = {};
    },
  },
});

export const farmerByUserActions = farmerByUserSlice.actions;
export default farmerByUserSlice.reducer;
