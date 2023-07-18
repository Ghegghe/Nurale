import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, RESOURCE_SKILLS, ResourceSkill } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";

interface Props {
    id: number
    resourceSkill: ResourceSkill
}

export const updateResourceSkill=createAsyncThunk(
    'patch/resource-skill',
    async ({id, resourceSkill}: Props, thunkApi)=>{
    try{
        const response = await apiClient.patch<AxiosResponse>({
            url:`${BASE}${API}${V1}${RESOURCE_SKILLS}/${id}`,
            body: resourceSkill
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