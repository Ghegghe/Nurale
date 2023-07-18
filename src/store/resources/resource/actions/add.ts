import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, RESOURCES, Resource } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";

export const addResource=createAsyncThunk(
    'post/resource',
    async (resource: Resource, thunkApi)=>{
    try{
        const response = await apiClient.post<AxiosResponse>({
            url:`${BASE}${API}${V1}${RESOURCES}`,
            body: resource
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