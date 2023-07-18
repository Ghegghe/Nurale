import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, TYPE_OF_PAYMENTS } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";

export const deleteTypeOfPayment=createAsyncThunk(
    'delete/type-of-payment',
    async (id: number, thunkApi)=>{
    try{
        const response = await apiClient.delete<AxiosResponse>({
            url:`${BASE}${API}${V1}${TYPE_OF_PAYMENTS}/${id}`
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