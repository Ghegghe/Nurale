import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, SALES_INVOICES } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";
import { SalesInvoicesParams } from "..";

export const fetchSalesInvoices=createAsyncThunk(
    'fetch/salesInvoices',
    async (params: SalesInvoicesParams, thunkApi)=>{
    try{
        const response = await apiClient.get<AxiosResponse>({
            url:`${BASE}${API}${V1}${SALES_INVOICES}`,
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