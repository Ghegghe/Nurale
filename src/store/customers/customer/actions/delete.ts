import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, CUSTOMERS } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";

export const deleteCustomer=createAsyncThunk(
    'delete/customer',
    async (id: number, thunkApi)=>{
    try{
        const response = await apiClient.delete<AxiosResponse>({
            url:`${BASE}${API}${V1}${CUSTOMERS}/${id}`
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