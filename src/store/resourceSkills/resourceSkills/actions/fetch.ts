import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, RESOURCE_SKILLS } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";
import { ResourceSkillsParams } from "..";

export const fetchResourceSkills=createAsyncThunk(
    'fetch/resource-skills',
    async (params: ResourceSkillsParams, thunkApi)=>{
    try{
        const response = await apiClient.get<AxiosResponse>({
            url:`${BASE}${API}${V1}${RESOURCE_SKILLS}`,
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