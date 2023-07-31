import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, PURCHASE_INVOICES, PurchaseInvoice } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";

export const addPurchaseInvoice=createAsyncThunk(
    'post/purchase-invoice',
    async (purchaseInvoice: PurchaseInvoice, thunkApi)=>{
    try{
        const response = await apiClient.post<AxiosResponse>({
            url:`${BASE}${API}${V1}${PURCHASE_INVOICES}`,
            body: purchaseInvoice
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