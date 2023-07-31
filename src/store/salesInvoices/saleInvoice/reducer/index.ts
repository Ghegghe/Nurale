import { createSlice } from "@reduxjs/toolkit";
import { InitialStateSaleInvoice } from "../types";
import { deleteSaleInvoice, updateSaleInvoice, addSaleInvoice } from "../actions";


const initialState: InitialStateSaleInvoice = {
    data: null,
    loading: false,
    error: null,
    pagination: 0
}

export const saleInvoiceReducer = createSlice({
    name: 'sale-invoice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteSaleInvoice.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(deleteSaleInvoice.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(deleteSaleInvoice.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
            .addCase(addSaleInvoice.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(addSaleInvoice.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(addSaleInvoice.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
            .addCase(updateSaleInvoice.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(updateSaleInvoice.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(updateSaleInvoice.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
    }
    
})