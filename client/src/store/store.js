import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import { productsApi } from "./api/productsApi";
import productReducer from "./slices/productSlice";
import { collectionApi } from "./api/collectionApi";
import SearchSlice from "./slices/searchSlice";
import toggleFilterSlice from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    products: productReducer,
    search: SearchSlice,
    filter: toggleFilterSlice,
    [productsApi.reducerPath]: productsApi.reducer,
    [collectionApi.reducerPath]: collectionApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, collectionApi.middleware), // add the API middleware
});
