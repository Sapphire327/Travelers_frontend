import {BaseQueryArg, createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth, refTokensApiResponse} from "@/store/api/baseQueryWithReauth";
import {LoginDto} from "@/store/auth/authTypes";

export const authApiSlice = createApi({
    reducerPath: 'authApi',
    baseQuery:baseQueryWithReauth,
    endpoints:(build)=>({
        login:build.mutation<LoginDto,{login:string,password:string}>({
            query:(userData) =>({
                url:'/api/auth/login',
                body:userData,
                method:'POST'
            }),
        }),
        refreshToken:build.mutation<refTokensApiResponse,void>({
            query:() =>({
                url:'/api/auth/refresh',
                method:'GET'
            }),
        })
    })
})
export const {useLoginMutation,useRefreshTokenMutation} = authApiSlice

