import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, TYPE_OF_PAYMENTS } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";

export const fetchTypeOfPayments=createAsyncThunk(
    'fetch/type-of-payments',
    async (_, thunkApi)=>{
    try{
        const response = await apiClient.get<AxiosResponse>({
            url:`${BASE}${API}${V1}${TYPE_OF_PAYMENTS}`
        })
        if(response.status===200 || response.status===201){
            return response.data;
        }
        return thunkApi.rejectWithValue('Error')
    }
    catch(error:any){
        return thunkApi.rejectWithValue('Error')
    }
});