import { createSlice } from '@reduxjs/toolkit';
import { productsApi } from '../api/productsApi';


let initialState = {
    prodcuts: [],
}


export const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder
            .addMatcher(
                productsApi.endpoints.getAllProducts.matchPending,
                (state) => {
                    state.prodcuts = [];
                }
            )
            .addMatcher(
                productsApi.endpoints.getAllProducts.matchFulfilled,
                (state, action) => {
                    state.prodcuts = action.payload;
                }
            )
            .addMatcher(
                productsApi.endpoints.getAllProducts.matchRejected,
                (state, action) => {
                    state.prodcuts = [];
                }
            )
    },
})

export default productSlice.reducer;