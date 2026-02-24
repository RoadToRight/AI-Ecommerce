import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: []
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;

      const existingItem = state.cart.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity = quantity;

      } else {
        product.quantity = quantity;
        state.cart.push(product)
      }

    },
    increment: (state, action) => {

    },
    decrement: (state, action) => {

    },
    removeFromCart: (state, action) => {
      const { product } = action.payload;
      const filteredCart = state.cart.filter((item) => item.id !== product.id)
      state.cart = filteredCart;
    },
    clearCart: (state, action) => {
      state.cart = []
    }
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
