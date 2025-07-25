'use client'
import {FC, ReactNode, useEffect} from 'react'
import {useRefreshTokenMutation} from "@/store/auth/authApiSlice";
import {setCredentials} from "@/store/auth/authSlice";
import {useDispatch} from "react-redux";

const AuthOnStart:FC<{children:ReactNode} >= ({children}) => {
    const [refresh] = useRefreshTokenMutation()
    const dispatch = useDispatch()
    useEffect(() => {
        try {
            refresh().then(({data})=>{
                if(data)
                    dispatch(setCredentials({accessToken:data.accessToken,login:data.login,isAdmin:data.isAdmin}));
            })
        } catch (e) {}
    }, []);
    return (
        <div>
            {children}
        </div>
    )
};
export default AuthOnStart;