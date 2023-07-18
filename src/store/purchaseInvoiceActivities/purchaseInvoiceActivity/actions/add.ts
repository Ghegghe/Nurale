import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, PURCHASE_INVOICE_ACTIVITIES, PurchaseInvoiceActivity } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";

export const addPurchaseInvoiceActivity=createAsyncThunk(
    'post/purchase-invoice-activity',
    async (purchaseInvoiceActivity: PurchaseInvoiceActivity, thunkApi)=>{
    try{
        const response = await apiClient.post<AxiosResponse>({
            url:`${BASE}${API}${V1}${PURCHASE_INVOICE_ACTIVITIES}`,
            body: purchaseInvoiceActivity
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