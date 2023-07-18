import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, RESOURCE_SKILLS, ResourceSkill } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";

export const addResourceSkill=createAsyncThunk(
    'post/resource-skill',
    async (resourceSkill: ResourceSkill, thunkApi)=>{
    try{
        const response = await apiClient.post<AxiosResponse>({
            url:`${BASE}${API}${V1}${RESOURCE_SKILLS}`,
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