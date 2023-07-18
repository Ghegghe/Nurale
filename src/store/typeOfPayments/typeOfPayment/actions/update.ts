import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, TYPE_OF_PAYMENTS, TypeOfPayment } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";

interface Props {
    id: number
    typeOfPayment: TypeOfPayment
}

export const updateTypeOfPayment=createAsyncThunk(
    'patch/type-of-payment',
    async ({id, typeOfPayment}: Props, thunkApi)=>{
    try{
        const response = await apiClient.patch<AxiosResponse>({
            url:`${BASE}${API}${V1}${TYPE_OF_PAYMENTS}/${id}`,
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