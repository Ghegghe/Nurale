import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, TYPE_OF_PAYMENTS, TypeOfPayment } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";

export const addTypeOfPayment=createAsyncThunk(
    'post/type-of-payment',
    async (typeOfPayment: TypeOfPayment, thunkApi)=>{
    try{
        const response = await apiClient.post<AxiosResponse>({
            url:`${BASE}${API}${V1}${TYPE_OF_PAYMENTS}`,
            body: typeOfPayment
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