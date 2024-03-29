import { createSlice } from '@reduxjs/toolkit';

const initialSearchBoxState = {
  keyword: '',
};

const searchBoxSlice = createSlice({
  name: 'searchBox',
  initialState: initialSearchBoxState,
  reducers: {
    setKeyword: (state, { payload }) => {
      state.keyword = payload.keyword;
    },
    clearKeyword: (state, { payload }) => {
      state.keyword = '';
    },
  },
  extraReducers: {},
});

export const searchBoxActions = searchBoxSlice.actions;
export default searchBoxSlice.reducer;
