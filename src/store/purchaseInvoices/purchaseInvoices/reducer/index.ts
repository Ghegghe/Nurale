import { createSlice } from "@reduxjs/toolkit";
import { initialStatePurchaseInvoices } from "../types";
import { fetchPurchaseInvoices } from "../actions";


const initialState: initialStatePurchaseInvoices = {
    data: [],
    loading: false,
    error: null,
    totalCount: 0
}

export const purchaseInvoicesReducer = createSlice({
    name: 'purchase-invoices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPurchaseInvoices.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.totalCount = action.payload.pagination.totalCount;
                state.loading = false
            })
            .addCase(fetchPurchaseInvoices.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(fetchPurchaseInvoices.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
    }
})