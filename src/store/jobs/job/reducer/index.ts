import { createSlice } from "@reduxjs/toolkit";
import { InitialStateJob } from "../types";
import { deleteJob, updateJob, addJob } from "../actions";

const initialState: InitialStateJob = {
    data: null,
    loading: false,
    error: null,
    pagination: 0
}

export const jobReducer = createSlice({
    name: 'job',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteJob.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(deleteJob.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(deleteJob.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
            .addCase(addJob.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(addJob.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(addJob.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
            .addCase(updateJob.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(updateJob.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(updateJob.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
    }
    
})