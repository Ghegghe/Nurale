import { createSlice } from "@reduxjs/toolkit";
import { InitialStatePurchaseInvoice } from "../types";
import { deletePurchaseInvoice, updatePurchaseInvoice, addPurchaseInvoice } from "../actions";


const initialState: InitialStatePurchaseInvoice = {
    data: null,
    loading: false,
    error: null,
    pagination: 0
}

export const purchaseInvoiceReducer = createSlice({
    name: 'purchase-invoice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deletePurchaseInvoice.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(deletePurchaseInvoice.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(deletePurchaseInvoice.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
            .addCase(addPurchaseInvoice.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(addPurchaseInvoice.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(addPurchaseInvoice.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
            .addCase(updatePurchaseInvoice.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(updatePurchaseInvoice.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(updatePurchaseInvoice.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
    }
    
})