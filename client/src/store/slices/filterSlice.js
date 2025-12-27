import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggleFilter: false
}

export const toggleFilterSlice = createSlice({
    name: "toggleFilterSlice",
    initialState,
    reducers: {
        toggleFilterAction: (state, action) => {
            state.toggleFilter = !state.toggleFilter
        }
    }
})
export default toggleFilterSlice.reducer;
export const { toggleFilterAction } = toggleFilterSlice.actions;