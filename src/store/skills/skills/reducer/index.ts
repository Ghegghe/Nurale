import { createSlice } from "@reduxjs/toolkit";
import { initialStateSkills } from "../types";
import { fetchSkills } from "../actions";


const initialState: initialStateSkills = {
    data: [],
    loading: false,
    error: null,
    pagination: 0
}

export const skillsReducer = createSlice({
    name: 'skill',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSkills.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(fetchSkills.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(fetchSkills.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Errore nel fetch utenti'
            })
        
    }
})