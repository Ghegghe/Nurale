import { createSlice } from "@reduxjs/toolkit";
import { initialStatePurchaseInvoiceActivities } from "../types";
import { fetchPurchaseInvoiceActivities } from "../actions";


const initialState: initialStatePurchaseInvoiceActivities = {
    data: [],
    loading: false,
    error: null,
    totalCount: 0
}

export const purchaseInvoiceActivitiesReducer = createSlice({
    name: 'purchase-invoice-activities',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPurchaseInvoiceActivities.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.totalCount = action.payload.pagination.totalCount;
                state.loading = false
            })
            .addCase(fetchPurchaseInvoiceActivities.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(fetchPurchaseInvoiceActivities.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
    }
})