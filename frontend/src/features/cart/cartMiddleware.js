import { cartActions } from './cartSlice';

export const cartMiddleware = (store) => (next) => (action) => {
  if (cartActions.removeItemFromCart.match(action)) {
    const cartItems = store
      .getState()
      .cart.cartItems.filter((x) => x.farmerProduct !== action.payload.id);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
  return next(action);
};
