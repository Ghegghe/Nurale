import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, SALES_INVOICES, SaleInvoice } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";

interface Props {
    id: number
    saleInvoice: SaleInvoice
}

export const updateSaleInvoice=createAsyncThunk(
    'patch/sale-invoice',
    async ({id, saleInvoice}: Props, thunkApi)=>{
    try{
        const response = await apiClient.patch<AxiosResponse>({
            url:`${BASE}${API}${V1}${SALES_INVOICES}/${id}`,
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