import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "../../types";

const initialState: Cart = {
  products: [],
  total: 0,
};

const getTotal = (items: CartItem[]): number => {
  let totalPrice = items.reduce((total, val) => total + val.price * val.qty, 0);
  return totalPrice;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      let idx = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      if (idx !== -1) {
        state.products[idx] = action.payload;
        state.total = getTotal(state.products);
      } else {
        state.products.push(action.payload);
        state.total = getTotal(state.products);
      }
    },
    removeFromCart(state, action: PayloadAction<CartItem>) {
      state.products.splice(
        state.products.findIndex((item) => item.id === action.payload.id),
        1
      );
      state.total = getTotal(state.products);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
