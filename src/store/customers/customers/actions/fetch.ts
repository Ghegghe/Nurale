import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, CUSTOMERS } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";
import { CustomerParams } from "..";

export const fetchCustomers=createAsyncThunk(
    'fetch/customers',
    async (params: CustomerParams, thunkApi)=>{
    try{
        const response = await apiClient.get<AxiosResponse>({
            url:`${BASE}${API}${V1}${CUSTOMERS}`,
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