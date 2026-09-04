'use client'
import BackgroundSticks from "@/components/UI/BackgroundSticks/BackgroundSticks"
import Button from "@/components/UI/FormElements/Button"
import Input from "@/components/UI/FormElements/Input"
import { useLoginMutation } from "@/store/auth/authApiSlice"
import { setCredentials } from "@/store/auth/authSlice"
import { isErrorWithMessage } from "@/store/helpers/errorPredicates"
import { useRouter } from "next/navigation"
import { FC } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import styles from "./page.module.css"
type FormValues = {
    login: string
    password: string
}

const page: FC = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [login, { isLoading, error }] = useLoginMutation()
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const userData = await login({ login: data.login, password: data.password }).unwrap()
            dispatch(setCredentials(userData))
            router.back()
        } catch (e) {
        }
    }
    return (
        <BackgroundSticks>
            <div className='container'>
                <div className={styles.login}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.login__form}>
                        <p>{isErrorWithMessage(error) && error.data.message}</p>
                        <div className={styles.login__inputs}>
                            <Input label={"Логин"} {...register('login', { required: true })} />
                            <Input label={"Пароль"} type='password' {...register('password',{ required: true })} />
                        </div>
                        <Button type='submit'>Войти</Button>
                    </form>
                </div>
            </div>
        </BackgroundSticks>

    )
}
export default page