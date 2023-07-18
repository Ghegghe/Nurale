import { createSlice } from "@reduxjs/toolkit";
import { initialStateResourceSkills } from "../types";
import { fetchResourceSkills } from "../actions";


const initialState: initialStateResourceSkills = {
    data: [],
    loading: false,
    error: null,
    totalCount: 0
}

export const resourceSkillsReducer = createSlice({
    name: 'resourceSkills',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchResourceSkills.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.totalCount = action.payload.pagination.totalCount;
                state.loading = false
            })
            .addCase(fetchResourceSkills.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(fetchResourceSkills.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
    }
})