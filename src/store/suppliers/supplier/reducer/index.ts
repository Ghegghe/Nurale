import { createSlice } from "@reduxjs/toolkit";
import { initialStateSupplier } from "../types";
import { deleteSupplier, updateSupplier, addSupplier } from "../actions";


const initialState: initialStateSupplier = {
    data: null,
    loading: false,
    error: null,
    pagination: 0
}

export const supplierReducer = createSlice({
    name: 'supplier',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteSupplier.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(deleteSupplier.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(deleteSupplier.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
            .addCase(addSupplier.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(addSupplier.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(addSupplier.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
            .addCase(updateSupplier.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(updateSupplier.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(updateSupplier.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
    }
    
})