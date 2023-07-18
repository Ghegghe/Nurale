import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, RESOURCES, Resource } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";

interface Props {
    id: number
    resource: Resource
}

export const updateResource=createAsyncThunk(
    'patch/resource',
    async ({id, resource}: Props, thunkApi)=>{
    try{
        const response = await apiClient.patch<AxiosResponse>({
            url:`${BASE}${API}${V1}${RESOURCES}/${id}`,
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