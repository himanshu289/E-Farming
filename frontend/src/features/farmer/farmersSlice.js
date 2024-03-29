import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialFarmersState = {
  farmers: [],
  loading: false,
  error: null,
  pages: null,
  page: null,
};

export const getFarmers = createAsyncThunk(
  'farmer/getFarmers',
  async ({ keyword = '', pageNumber = '' }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/farmers?keyword=${keyword}&pageNumber=${pageNumber}`
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

const farmersSlice = createSlice({
  name: 'farmers',
  initialState: initialFarmersState,
  reducers: {},
  extraReducers: {
    //getFarmers
    [getFarmers.pending]: (state) => {
      state.loading = true;
      state.farmers = [];
      state.error = null;
      state.pages = null;
      state.page = null;
    },
    [getFarmers.fulfilled]: (state, { payload }) => {
      state.farmers = payload.farmers;
      state.pages = payload.pages;
      state.page = payload.page;
      state.loading = false;
      state.error = null;
    },
    [getFarmers.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.farmers = [];
      state.pages = null;
      state.page = null;
    },
  },
});

export const farmersActions = farmersSlice.actions;
export default farmersSlice.reducer;
