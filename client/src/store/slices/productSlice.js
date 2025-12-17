import { createSlice } from '@reduxjs/toolkit';
import { productsApi } from '../api/productsApi';


let initialState = {
    products: [],
}


export const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder
            .addMatcher(
                productsApi.endpoints.getAllProducts.matchPending,
                (state) => {
                    state.products = [];
                }
            )
            .addMatcher(
                productsApi.endpoints.getAllProducts.matchFulfilled,
                (state, action) => {
                    state.products = action.payload;
                }
            )
            .addMatcher(
                productsApi.endpoints.getAllProducts.matchRejected,
                (state, action) => {
                    state.products = [];
                }
            )
    },
})

export default productSlice.reducer;