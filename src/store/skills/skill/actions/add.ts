import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, SKILLS, Skill } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";

export const addSkill=createAsyncThunk(
    'post/skill',
    async (skill: Skill, thunkApi)=>{
    try{
        const response = await apiClient.post<AxiosResponse>({
            url:`${BASE}${API}${V1}${SKILLS}`,
            body: skill
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