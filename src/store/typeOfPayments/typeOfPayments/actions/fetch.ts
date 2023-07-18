import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, TYPE_OF_PAYMENTS } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";
import { TypeOfPaymentsParams } from "..";

export const fetchTypeOfPayments=createAsyncThunk(
    'fetch/type-of-payments',
    async (params: TypeOfPaymentsParams, thunkApi)=>{
    try{
        const response = await apiClient.get<AxiosResponse>({
            url:`${BASE}${API}${V1}${TYPE_OF_PAYMENTS}`,
            params
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