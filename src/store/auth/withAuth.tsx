'use client'
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import { useRouter } from 'next/navigation';
import {
    selectCurrentAdminStatus,
    selectCurrentAuthLoading,
    selectCurrentToken,
} from "@/store/auth/authSlice";

const withAuth = (WrappedComponent: React.FC,isAdminPage:boolean=true,) => {
    const AuthComponent = (props: any) => {
        const router = useRouter();
        const token = useSelector(selectCurrentToken);
        const isLoading = useSelector(selectCurrentAuthLoading)
        const isAdmin = useSelector(selectCurrentAdminStatus)
        useEffect(() => {
            if ((!isLoading && !token)||(token&&isAdminPage&&!isAdmin)) {
                router.push('/login');
            }
        }, [token, isLoading, router]);

        return token ? <WrappedComponent {...props} /> : null;
    };

    return AuthComponent;
};

export default withAuth;