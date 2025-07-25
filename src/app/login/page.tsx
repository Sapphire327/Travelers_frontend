'use client'
import { FC } from 'react'
import styles from "./page.module.css";
import Title from "@/components/UI/TItle/Title";
import BackgroundSticks from "@/components/UI/BackgroundSticks/BackgroundSticks";
import TourElement from "@/components/screens/TourElement/TourElement";
import {tours} from "@/app/Data";
import clsx from "clsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {useLoginMutation} from "@/store/auth/authApiSlice";
import {setCredentials} from "@/store/auth/authSlice";
import {useDispatch} from "react-redux";
import {isErrorWithMessage} from "@/store/helpers/errorPredicates";
import {useRouter} from "next/navigation";
import Input from "@/components/UI/FormElements/Input";
import Button from "@/components/UI/FormElements/Button";
type FormValues = {
    login: string
    password: string
}

const page:FC = () => {
    const dispatch = useDispatch()
    const router = useRouter();
    const [login,{isLoading,error}] = useLoginMutation()
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> =async (data) => {
        try {
            const userData = await login({login:data.login,password:data.password}).unwrap()
            dispatch(setCredentials(userData))
            router.back()
        }catch (e){
        }
    }
    return (
        <BackgroundSticks>
        <div className='container'>
            <div className={styles.login}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.login__form}>
                    <p>{isErrorWithMessage(error)&&error.data.message}</p>
                    <div className={styles.login__inputs}>
                        <Input label={"Логин"} {...register('login',{required:true})}/>
                        <Input label={"Пароль"} {...register('password',{required:true})}/>
                    </div>
                    <Button type='submit'>Войти</Button>
                </form>
            </div>
        </div>
        </BackgroundSticks>

    )
};
export default page;