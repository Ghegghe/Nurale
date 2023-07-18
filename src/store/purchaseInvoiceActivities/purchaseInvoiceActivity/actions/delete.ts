import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, PURCHASE_INVOICE_ACTIVITIES } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";

export const deletePurchaseInvoiceActivity=createAsyncThunk(
    'delete/purchase-invoice-activity',
    async (id: number, thunkApi)=>{
    try{
        const response = await apiClient.delete<AxiosResponse>({
            url:`${BASE}${API}${V1}${PURCHASE_INVOICE_ACTIVITIES}/${id}`
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