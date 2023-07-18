import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, RESOURCES } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";
import { ResourcesParams } from "..";

export const fetchResources=createAsyncThunk(
    'fetch/resources',
    async (params: ResourcesParams, thunkApi)=>{
    try{
        const response = await apiClient.get<AxiosResponse>({
            url:`${BASE}${API}${V1}${RESOURCES}`,
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