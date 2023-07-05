import { createSlice } from "@reduxjs/toolkit";
import { initialStateUser } from "../types";
import { deleteUser } from "../actions";
import { addUser } from "../actions/add";


const initialState: initialStateUser = {
    data: null,
    loading: false,
    error: null,
    pagination: 0
}

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteUser.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(deleteUser.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(deleteUser.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Errore nel delete utente'
            })
            .addCase(addUser.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(addUser.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(addUser.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Errore nel add utente'
            })
    }
    
})