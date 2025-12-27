import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: []
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((cartItem) => item.id === cartItem.id);
      if (existingItem) {
        existingItem.quantity += 1
      }
      state.cart.push(item)
    },
    increment: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((cartItem) => item.id === cartItem.id);
      // if (existingItem) {
      //   existingItem.quantity += item.quantity 
      // }
    },
    decrement: (state, action) => {

    },
    removeFromCart: (state, action) => {

    },
    clearCart: (state, action) => {

    }
  },
});

export const { } = cartSlice.actions;

export default cartSlice.reducer;
