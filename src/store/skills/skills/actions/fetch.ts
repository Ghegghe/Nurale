import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, SKILLS } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";
import { SkillParams } from "..";

export const fetchSkills=createAsyncThunk(
    'fetch/skills',
    async (params: SkillParams, thunkApi)=>{
    try{
        const response = await apiClient.get<AxiosResponse>({
            url:`${BASE}${API}${V1}${SKILLS}`,
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