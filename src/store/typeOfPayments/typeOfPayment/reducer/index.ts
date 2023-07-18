import { createSlice } from "@reduxjs/toolkit";
import { initialStateTypeOfPayment } from "../types";
import { deleteTypeOfPayment, updateTypeOfPayment, addTypeOfPayment } from "../actions";


const initialState: initialStateTypeOfPayment = {
    data: null,
    loading: false,
    error: null,
    pagination: 0
}

export const typeOfPaymentReducer = createSlice({
    name: 'type-of-payment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteTypeOfPayment.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(deleteTypeOfPayment.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(deleteTypeOfPayment.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Errore nel delete utente'
            })
            .addCase(addTypeOfPayment.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(addTypeOfPayment.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(addTypeOfPayment.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Errore nel add utente'
            })
            .addCase(updateTypeOfPayment.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(updateTypeOfPayment.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(updateTypeOfPayment.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Errore nel update utente'
            })
    }
    
})