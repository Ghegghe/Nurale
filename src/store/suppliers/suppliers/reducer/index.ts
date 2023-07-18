import { createSlice } from "@reduxjs/toolkit";
import { initialStateSuppliers } from "../types";
import { fetchSuppliers } from "../actions";


const initialState: initialStateSuppliers = {
    data: [],
    loading: false,
    error: null,
    totalCount: 0
}

export const suppliersReducer = createSlice({
    name: 'suppliers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuppliers.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.totalCount = action.payload.pagination.totalCount;
                state.loading = false
            })
            .addCase(fetchSuppliers.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(fetchSuppliers.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
    }
})