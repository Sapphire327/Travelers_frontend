import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
    FetchBaseQueryMeta
} from '@reduxjs/toolkit/query/react'
import {setCredentials, logOutCredentials, selectCurrentToken} from "@/store/auth/authSlice";
import {RootState} from "@/store/store";

export interface refTokensApiResponse {
    login: string;
    isAdmin:boolean;
    accessToken: string;
}

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = (<RootState>getState()).authReducer.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
})



export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta> = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        const refreshResult = await baseQuery({
            url: '/api/auth/refresh',
            method:'GET',
            credentials:"include"
        }, api, extraOptions)
        if (refreshResult?.data) {
            let data = (refreshResult.data as refTokensApiResponse)
            api.dispatch(setCredentials({accessToken: data.accessToken,login:data.login,isAdmin:data.isAdmin}));
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOutCredentials())
        }
    }
    return result;
}

