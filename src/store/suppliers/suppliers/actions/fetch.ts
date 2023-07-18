import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, SUPPLIERS } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";
import { SuppliersParams } from "..";

export const fetchSuppliers=createAsyncThunk(
    'fetch/suppliers',
    async (params: SuppliersParams, thunkApi)=>{
    try{
        const response = await apiClient.get<AxiosResponse>({
            url:`${BASE}${API}${V1}${SUPPLIERS}`,
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