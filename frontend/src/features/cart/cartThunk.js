import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ farmerProductId, qty }, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/farmer-products/${farmerProductId}`
      );
      const cartItem = {
        farmerProduct: data._id,
        productName: data.product.name,
        productImage: data.product.image,
        farmerName: data.farmer.farmName,
        farmerImage: data.farmer.image,
        price: data.price,
        countInStock: data.countInStock,
        farmerId: data.farmer._id,
        qty,
      };

      const existItem = getState().cart.cartItems.find(
        (x) => x.farmerProduct === cartItem.farmerProduct
      );

      const cartItems = !existItem
        ? [...getState().cart.cartItems, cartItem]
        : getState().cart.cartItems.map((x) =>
            x.farmerProduct === existItem.farmerProduct ? cartItem : x
          );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return cartItem;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
