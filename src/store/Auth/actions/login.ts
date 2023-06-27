import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { LoginInterface, BASE, API, V1, AUTH, LOGIN } from "../../../utils";
import { addTokenCookies } from "../../../utils/auth";
import apiClient from "../../../utils/helper/apiClient";
import { UserLogin } from "../types";

interface LoginResponse{
    user: UserLogin
}

export const LoginUser=createAsyncThunk(
    'auth/Login',
    async(data:LoginInterface)=>{
        try{
            const response=await apiClient.post<AxiosResponse>({
                url:`${BASE}${API}${V1}${AUTH}${LOGIN}`,
                body:{...data},
            })
            if(response.status===200 || response.status===201){
                const data:LoginResponse =response.data;
                addTokenCookies({
                    token:data.user.stsTokenManager.accessToken,
                    refreshToken: data.user.stsTokenManager.refreshToken,
                });
                return response.data;
            }
            return null
        }
        catch(error:any){
            return null;
        }
    }
);