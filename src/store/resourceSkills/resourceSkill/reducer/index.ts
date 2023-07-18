import { createSlice } from "@reduxjs/toolkit";
import { initialStateResourceSkill } from "../types";
import { deleteResourceSkill, updateResourceSkill, addResourceSkill } from "../actions";


const initialState: initialStateResourceSkill = {
    data: null,
    loading: false,
    error: null,
    pagination: 0
}

export const resourceSkillReducer = createSlice({
    name: 'resource-skill',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteResourceSkill.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(deleteResourceSkill.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(deleteResourceSkill.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
            .addCase(addResourceSkill.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(addResourceSkill.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(addResourceSkill.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
            .addCase(updateResourceSkill.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.pagination = action.payload.pagination;
                state.loading = false
            })
            .addCase(updateResourceSkill.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(updateResourceSkill.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
    }
    
})