import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, PURCHASE_INVOICE_ACTIVITIES } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";
import { PurchaseInvoiceActivitiesParams } from "..";

export const fetchPurchaseInvoiceActivities=createAsyncThunk(
    'fetch/purchaseInvoiceActivities',
    async (params: PurchaseInvoiceActivitiesParams, thunkApi)=>{
    try{
        const response = await apiClient.get<AxiosResponse>({
            url:`${BASE}${API}${V1}${PURCHASE_INVOICE_ACTIVITIES}`,
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