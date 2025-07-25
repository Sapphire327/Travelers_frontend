'use client'
import {FC, ReactNode, useEffect} from 'react'
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {selectCurrentAdminStatus, selectCurrentAuthLoading, selectCurrentToken} from "@/store/auth/authSlice";

const WithAuthHoc:FC<{children:ReactNode,isAdminPage?:boolean}> = ({children,isAdminPage=true}) => {
    const router = useRouter();
    const token = useSelector(selectCurrentToken);
    const isLoading = useSelector(selectCurrentAuthLoading)
    const isAdmin = useSelector(selectCurrentAdminStatus)
    useEffect(() => {
        if (!isLoading && !token) {
            router.push('/login');
        }
        if(token&&isAdminPage&&!isAdmin){
            router.push('/');
        }
    }, [token, isLoading, router,isAdmin]);
    return token && (!isAdminPage || (isAdminPage && isAdmin)) ? children : null;
};
export default WithAuthHoc;