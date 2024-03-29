import { createSlice } from '@reduxjs/toolkit';
import { addToCart } from './cartThunk';

const initialCartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    clearCartData(state) {
      state.cartItems = [];
    },
    removeItemFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (x) => x.farmerProduct !== action.payload.id
      );
    },
  },
  extraReducers: {
    // addToCart
    [addToCart.pending]: (state) => {
      console.log('Loadingg');
    },
    [addToCart.fulfilled]: (state, { payload }) => {
      const item = payload;
      const existItem = state.cartItems.find(
        (x) => x.farmerProduct === item.farmerProduct
      );
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.farmerProduct === existItem.farmerProduct ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
    },
    [addToCart.rejected]: (state, { payload }) => {
      console.log('ERROR');
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
