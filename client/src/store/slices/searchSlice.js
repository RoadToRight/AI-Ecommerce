import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggleSearch: false
}

export const SearchSlice = createSlice({
    name: "SearchSlice",
    initialState,
    reducers: {
        toggleSearchAction: (state, action) => {
            state.toggleSearch = !state.toggleSearch
        }
    }
})
export default SearchSlice.reducer;
export const { toggleSearchAction } = SearchSlice.actions;