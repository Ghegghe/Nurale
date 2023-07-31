import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BASE, API, V1, JOBS } from "../../../../utils";
import apiClient from "../../../../utils/helper/apiClient";
import { JobsParams } from "..";

export const fetchJobs=createAsyncThunk(
    'fetch/jobs',
    async (params: JobsParams, thunkApi)=>{
    try{
        const response = await apiClient.get<AxiosResponse>({
            url:`${BASE}${API}${V1}${JOBS}`,
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