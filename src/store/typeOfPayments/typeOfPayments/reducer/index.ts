import { createSlice } from "@reduxjs/toolkit";
import { initialStateTypeOfPayments } from "../types";
import { fetchTypeOfPayments } from "../actions";


const initialState: initialStateTypeOfPayments = {
    data: [],
    loading: false,
    error: null,
    totalCount: 0
}

export const typeOfPaymentsReducer = createSlice({
    name: 'type-of-payments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTypeOfPayments.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.totalCount = action.payload.pagination.totalCount;
                state.loading = false
            })
            .addCase(fetchTypeOfPayments.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(fetchTypeOfPayments.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Errore nel fetch utenti'
            })
        
    }
})