import { createSlice } from '@reduxjs/toolkit';

const initialUserSessionState = {
  paymentMethod: null,
};

const userSessionSlice = createSlice({
  name: 'user',
  initialState: initialUserSessionState,
  reducers: {
    savePaymentMethod(state, { payload }) {
      state.paymentMethod = payload.paymentMethod;
    },
  },
  extraReducers: {},
});

export const userSessionActions = userSessionSlice.actions;
export default userSessionSlice.reducer;
