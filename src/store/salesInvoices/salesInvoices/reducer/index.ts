import { createSlice } from "@reduxjs/toolkit";
import { initialStateSalesInvoices } from "../types";
import { fetchSalesInvoices } from "../actions";


const initialState: initialStateSalesInvoices = {
    data: [],
    loading: false,
    error: null,
    totalCount: 0
}

export const salesInvoicesReducer = createSlice({
    name: 'sales-invoices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSalesInvoices.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.totalCount = action.payload.pagination.totalCount;
                state.loading = false
            })
            .addCase(fetchSalesInvoices.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(fetchSalesInvoices.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
    }
})