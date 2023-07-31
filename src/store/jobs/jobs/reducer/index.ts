import { createSlice } from "@reduxjs/toolkit";
import { initialStateJobs } from "../types";
import { fetchJobs } from "../actions";


const initialState: initialStateJobs = {
    data: [],
    loading: false,
    error: null,
    totalCount: 0
}

export const jobsReducer = createSlice({
    name: 'jobs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.totalCount = action.payload.pagination.totalCount;
                state.loading = false
            })
            .addCase(fetchJobs.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(fetchJobs.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
    }
})