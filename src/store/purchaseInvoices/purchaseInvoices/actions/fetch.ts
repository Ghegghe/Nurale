import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, PURCHASE_INVOICES } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";
import { PurchaseInvoicesParams } from "..";

export const fetchPurchaseInvoices=createAsyncThunk(
    'fetch/purchaseInvoices',
    async (params: PurchaseInvoicesParams, thunkApi)=>{
    try{
        const response = await apiClient.get<AxiosResponse>({
            url:`${BASE}${API}${V1}${PURCHASE_INVOICES}`,
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