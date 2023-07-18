import { createSlice } from "@reduxjs/toolkit";
import { initialStateUsers } from "../types";
import { fetchUsers } from "../actions";


const initialState: initialStateUsers = {
    data: [],
    loading: false,
    error: null,
    totalCount: 0
}

export const usersReducer = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action)=>
            {
                state.data = action.payload.data; 
                state.totalCount = action.payload.pagination.totalCount;
                state.loading = false
            })
            .addCase(fetchUsers.pending, (state)=>
            {
                state.loading = true
            })
            .addCase(fetchUsers.rejected, (state)=>
            {
                state.loading = false
                state.error = 'Error'
            })
        
    }
})