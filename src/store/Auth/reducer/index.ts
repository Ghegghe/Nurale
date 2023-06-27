import { createSlice } from "@reduxjs/toolkit"
import { initialStateAuth } from "../types"
import { LoginUser } from "../actions/login"

const initialState: initialStateAuth = {
    data:[],
    loading: false,
    error: null
}

export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
        .addCase(LoginUser.fulfilled, (state, action)=>{
            state.data = action.payload.data
            state.loading = false
        })
        .addCase(LoginUser.pending, (state)=>{
            state.loading = true
        })
        .addCase(LoginUser.rejected, (state)=>{
            state.loading = false
            state.error = 'Login error'
        })
    }
})