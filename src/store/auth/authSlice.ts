'use client'
import {createSlice, PayloadAction, Store} from '@reduxjs/toolkit'
import {useAppSelector} from "@/store/hooks";
import {RootState} from "@/store/store";
import {LoginDto} from "@/store/auth/authTypes";

interface IAuthState {
    login:string |null;
    token:string|null;
    isAdmin:boolean;
    authLoading:boolean;
}
const authSlice = createSlice({
    name: 'auth',
    initialState: { login: null,token:null,authLoading:true } as IAuthState,
    reducers:{
        setCredentials(state:IAuthState, action:PayloadAction<LoginDto>){
            const {login,accessToken,isAdmin} = action.payload;
            state.authLoading=false;
            state.isAdmin=isAdmin
            state.login = login;
            state.token = accessToken;
        },
        // setProfile(state:IAuthState, action:PayloadAction<Profile>){
        //     state.user=action.payload;
        // },
        logOutCredentials:(state:IAuthState)=>{
            state.login = null;
            state.token = null;
            state.isAdmin = false;
            state.authLoading=false;
        }
    }
})

export const {setCredentials, logOutCredentials} = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentUser = (state:RootState)=>state.authReducer.login;
export const selectCurrentToken = (state:RootState)=>state.authReducer.token;
export const selectCurrentAuthLoading = (state:RootState)=>state.authReducer.authLoading;
export const selectCurrentAdminStatus= (state:RootState)=>state.authReducer.isAdmin;
// export const selectCurrentUser =  useAppSelector(state => state.auth.user)
// export const selectCurrentToken =  useAppSelector(state =>  state.auth.token)
