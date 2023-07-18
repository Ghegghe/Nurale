import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, SUPPLIERS } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";

export const deleteSupplier=createAsyncThunk(
    'delete/supplier',
    async (id: number, thunkApi)=>{
    try{
        const response = await apiClient.delete<AxiosResponse>({
            url:`${BASE}${API}${V1}${SUPPLIERS}/${id}`
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