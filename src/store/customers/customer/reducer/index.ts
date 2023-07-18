import { createSlice } from "@reduxjs/toolkit";
import { initialStateCustomer } from "../types";
import { deleteCustomer, updateCustomer, addCustomer } from "../actions";


const initialState: initialStateCustomer = {
    data: null,
    loading: false,
    error: null,
    pagination: 0
}

export const customerReducer = createSlice({
    name: 'customer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteCustomer.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(deleteCustomer.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(deleteCustomer.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
            .addCase(addCustomer.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(addCustomer.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(addCustomer.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
            .addCase(updateCustomer.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(updateCustomer.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(updateCustomer.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
    }
    
})