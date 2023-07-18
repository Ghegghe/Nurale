import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, PURCHASE_INVOICE_ACTIVITIES, PurchaseInvoiceActivity } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";

interface Props {
    id: number
    purchaseInvoiceActivity: PurchaseInvoiceActivity
}

export const updatePurchaseInvoiceActivity=createAsyncThunk(
    'patch/purchase-invoice-activity',
    async ({id, purchaseInvoiceActivity}: Props, thunkApi)=>{
    try{
        const response = await apiClient.patch<AxiosResponse>({
            url:`${BASE}${API}${V1}${PURCHASE_INVOICE_ACTIVITIES}/${id}`,
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