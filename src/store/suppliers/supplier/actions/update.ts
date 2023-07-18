import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, SUPPLIERS, Supplier } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";

interface Props {
    id: number
    supplier: Supplier
}

export const updateSupplier=createAsyncThunk(
    'patch/supplier',
    async ({id, supplier}: Props, thunkApi)=>{
    try{
        const response = await apiClient.patch<AxiosResponse>({
            url:`${BASE}${API}${V1}${SUPPLIERS}/${id}`,
            body: supplier
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