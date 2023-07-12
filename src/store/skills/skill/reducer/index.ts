import { createSlice } from "@reduxjs/toolkit";
import { initialStateSkill } from "../types";
import { deleteSkill, updateSkill, addSkill } from "../actions";


const initialState: initialStateSkill = {
    data: null,
    loading: false,
    error: null,
    pagination: 0
}

export const skillReducer = createSlice({
    name: 'skill',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteSkill.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(deleteSkill.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(deleteSkill.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Errore nel delete utente'
            })
            .addCase(addSkill.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(addSkill.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(addSkill.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Errore nel add utente'
            })
            .addCase(updateSkill.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(updateSkill.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(updateSkill.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Errore nel update utente'
            })
    }
    
})