import { createSlice } from "@reduxjs/toolkit";
import { InitialStatePurchaseInvoiceActivity } from "../types";
import { deletePurchaseInvoiceActivity, updatePurchaseInvoiceActivity, addPurchaseInvoiceActivity } from "../actions";


const initialState: InitialStatePurchaseInvoiceActivity = {
    data: null,
    loading: false,
    error: null,
    pagination: 0
}

export const purchaseInvoiceActivityReducer = createSlice({
    name: 'purchase-invoice-activity',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deletePurchaseInvoiceActivity.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(deletePurchaseInvoiceActivity.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(deletePurchaseInvoiceActivity.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
            .addCase(addPurchaseInvoiceActivity.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(addPurchaseInvoiceActivity.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(addPurchaseInvoiceActivity.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
            .addCase(updatePurchaseInvoiceActivity.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(updatePurchaseInvoiceActivity.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(updatePurchaseInvoiceActivity.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
    }
    
})