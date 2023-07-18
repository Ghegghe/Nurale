import { createSlice } from "@reduxjs/toolkit";
import { initialStateResource } from "../types";
import { deleteResource, updateResource, addResource } from "../actions";


const initialState: initialStateResource = {
    data: null,
    loading: false,
    error: null,
    pagination: 0
}

export const resourceReducer = createSlice({
    name: 'resource',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteResource.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(deleteResource.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(deleteResource.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
            .addCase(addResource.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(addResource.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(addResource.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
            .addCase(updateResource.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(updateResource.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(updateResource.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
    }
    
})