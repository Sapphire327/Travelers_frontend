'use client'
import {FC, useEffect, useMemo, useState} from 'react'
import styles from "./TourEditor.module.css";
import {useCreatePlaceMutation, useGetPlaceByIdQuery, useGetPlaceListQuery} from "@/store/places/placesApiSlice";
import Loader from "@/components/UI/Loader/Loader";
import clsx from "clsx";
import {SubmitHandler, useForm} from "react-hook-form";
import ConfirmModal from "@/components/UI/ConfirmModal/ConfirmModal";
import {getMessageFromError, isErrorWithMessage, isErrorWithZodErrors} from "@/store/helpers/errorPredicates";
import {toast} from "react-toastify";
import {
    useChangeTourMutation,
    useCreateTourMutation,
    useDeleteTourMutation,
    useGetTourByIdQuery
} from "@/store/tours/toursApiSlice";
import {useRouter} from "next/navigation";
import {dateToInputString} from "@/helpers/DateToString";
import Input from "@/components/UI/FormElements/Input";
import Select from "@/components/UI/FormElements/Select";
import Button from "@/components/UI/FormElements/Button";

interface IProps {
    id?: number
}

type FormValues = {
    datesTo: string,
    datesFrom: string,
    maxPeople: number,
    startPlace: string,
    price: number,
    placesId: number,
}
const TourEditor: FC<IProps> = ({id}) => {
    const {data:places} = useGetPlaceListQuery()
    const {
        register,
        watch,
        setValue,
        handleSubmit,
        formState: {errors: formErrors}
    } = useForm<FormValues>();
    const {data, refetch, error: FetchPlaceError} = useGetTourByIdQuery(id || -1, {skip: id == undefined})
    const [createTour] = useCreateTourMutation()
    const [changeTour] = useChangeTourMutation()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [deleteTour] = useDeleteTourMutation()
    const PlaceOptionList=useMemo(()=>{
        if(places) {
            return places.map((place) => ({
               value:place.id,
               label:place.name
            }))
        }else{
            return []
        }
    },[places])
    const router = useRouter();
    useEffect(() => {
        if (data && !FetchPlaceError) {
            setValue('placesId',data.place.id)
            setValue('price',data.price)
            setValue('startPlace',data.startPlace)
            setValue('maxPeople',data.maxPeople)
            setValue('datesFrom',dateToInputString(data.datesFrom))
            setValue('datesTo',dateToInputString(data.datesTo))
        }
    }, [data]);

    const DeleteTour = async () => {
        if (id) {
            const res = await deleteTour(id)
            if (!res.error) {
                toast.success('Тур успешно удален')
                router.push('/admin/tours/')
            }
        }
    }
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            if (!id) {
                const res = await createTour({
                    ...data,
                    datesFrom:new Date(data.datesFrom),
                    datesTo:new Date(data.datesTo)
                })
                if (res.error) {
                    if (isErrorWithZodErrors(res.error)) {
                        toast.error(res.error.data.errors[0])
                    }else if(isErrorWithMessage(res.error)){
                        toast.error(res.error.data.message)
                        console.log('rer')
                    }
                } else {
                    toast.success('Запись успешно добавлена')
                    router.push('/admin/tours/')
                }
            } else {
                const res = await changeTour({
                    ...data,
                    id,
                    datesFrom:new Date(data.datesFrom),
                    datesTo:new Date(data.datesTo)
                })
                if (!res.error) {
                    refetch()
                    toast.success('Запись успешно обновлена')
                } else {
                }
            }
        } catch (e) {
        }
    }


    return (
        <div className={styles.wrap}>
            {places&&(id == undefined || data) ?
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Select defaultValue={-1} className={styles.select_top} list={PlaceOptionList} label='Место' noChoiceText='Выберите место' required {...register('placesId', {required: "Выберите место"})}/>
                    <div className={styles.groupTwoInput}>
                        <Input type='date' label='Дата:старт' required {...register('datesFrom', {required: "Выберите дату старта",valueAsDate:true})}/>
                        <Input type='date' label='Дата:завершение' required {...register('datesTo', {required: "Выберите дату завершения",valueAsDate:true})}/>
                    </div>
                    <div className={styles.groupTwoInput}>
                        <Input style={{maxWidth: "200px"}} label='Кол-во людей в группе' required {...register('maxPeople', {required: "Введите кол-во людей"})}/>
                        <Input style={{maxWidth: "200px"}} label='Цена (руб)' required {...register('price', {required: "Введите цену"})}/>
                    </div>
                    <Input className={styles.linkInput} label='Адрес старта тура' required {...register('startPlace', {required: "Введите ссылку на точку на карте"})}/>

                    {
                        (id == undefined) ?
                            <Button type="submit" className={styles.sendButton}>Добавить тур</Button> :
                            <div>
                                <Button type="submit" className={styles.sendButton}>Сохранить тур</Button>
                                <Button type="button" onClick={() => {
                                    setIsModalOpen(true)
                                }} className={clsx(styles.deleteButton)}>Удалить тур</Button>
                            </div>
                    }
                </form> :
                <Loader></Loader>}
            <ConfirmModal acceptButtonColor={"#611e1e"} isModalOpen={isModalOpen} onDeny={()=>{setIsModalOpen(false)}} onAccept={DeleteTour} acceptButtonText={"Удалить"} denyButtonText={"Отмена"}  text={["Вы уверены что хотите удалить эту запись?","Связанные с ней заявки также будут удалены"]}/>

        </div>
    )
};
export default TourEditor;