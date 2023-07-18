import { createSlice } from "@reduxjs/toolkit";
import { initialStateResources } from "../types";
import { fetchResources } from "../actions";


const initialState: initialStateResources = {
    data: [],
    loading: false,
    error: null,
    totalCount: 0
}

export const resourcesReducer = createSlice({
    name: 'resources',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchResources.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.totalCount = action.payload.pagination.totalCount;
                state.loading = false
            })
            .addCase(fetchResources.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(fetchResources.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
    }
})