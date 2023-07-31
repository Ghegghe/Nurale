import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, PURCHASE_INVOICES, PurchaseInvoice } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";

interface Props {
    id: number
    purchaseInvoice: PurchaseInvoice
}

export const updatePurchaseInvoice=createAsyncThunk(
    'patch/purchase-invoice',
    async ({id, purchaseInvoice}: Props, thunkApi)=>{
    try{
        const response = await apiClient.patch<AxiosResponse>({
            url:`${BASE}${API}${V1}${PURCHASE_INVOICES}/${id}`,
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