import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, PURCHASE_INVOICES, SaleInvoice } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";

export const addSaleInvoice=createAsyncThunk(
    'post/sale-invoice',
    async (saleInvoice: SaleInvoice, thunkApi)=>{
    try{
        const response = await apiClient.post<AxiosResponse>({
            url:`${BASE}${API}${V1}${PURCHASE_INVOICES}`,
            body: saleInvoice
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