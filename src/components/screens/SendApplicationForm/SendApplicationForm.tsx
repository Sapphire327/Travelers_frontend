import { FC } from 'react'
import styles from "./SendApplicationForm.module.css";
import Input from "@/components/UI/FormElements/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import TextArea from "@/components/UI/FormElements/TextArea";
import clsx from "clsx";
import {useCreateApplicationMutation} from "@/store/applications/applicationsApiSlice";
import {isErrorWithMessage, isErrorWithZodErrors} from "@/store/helpers/errorPredicates";
import Button from "@/components/UI/FormElements/Button";

type FormValues = {
    phone:string,
    fio:string,
    comment:string,
}

const SendApplicationForm:FC<{id:number}> = ({id}) => {
    const {
        register,
        handleSubmit,
        formState: {errors: formErrors},
        reset
    } = useForm<FormValues>();
    const [createApplication] = useCreateApplicationMutation()
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
       try {
           const res = await createApplication({...data,toursId:id})
           if (res.error) {
               if (isErrorWithZodErrors(res.error)) {
                   toast.error(res.error.data.errors[0])
               }else if(isErrorWithMessage(res.error)){
                   toast.error(res.error.data.message)
               }
           } else {
               toast.success('Заявка успешно отправлена')
               reset()
           }
       }catch(e){

       }

    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Input className={styles.form__elem} label={"Фио"}
                   required {...register('fio', {required: "Введите своё фио"})}></Input>
            <Input className={styles.form__elem} label={"Телефон"}
                   required {...register('phone', {required: "Введите свой телефон"})}></Input>
            <TextArea rows={5} className={styles.form__elem} label={"Комментарий"}
                      {...register('comment')}></TextArea>
            <Button type="submit" className={clsx(styles.sendButton)}
                    value=''>Отправить заявку</Button>
        </form>
)
};
export default SendApplicationForm;