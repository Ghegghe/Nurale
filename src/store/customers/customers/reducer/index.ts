import { createSlice } from "@reduxjs/toolkit";
import { initialStateCustomers } from "../types";
import { fetchCustomers } from "../actions";


const initialState: initialStateCustomers = {
    data: [],
    loading: false,
    error: null,
    totalCount: 0
}

export const customersReducer = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.totalCount = action.payload.pagination.totalCount;
                state.loading = false
            })
            .addCase(fetchCustomers.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(fetchCustomers.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Errore nel fetch utenti'
            })
    }
})