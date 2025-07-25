'use client'
import {FC, useEffect, useMemo, useState} from 'react'
import styles from "./application.module.css";
import {Application} from "@/store/applications/applications.types";
import clsx from "clsx";
import Select from "@/components/UI/FormElements/Select";
import Button from "@/components/UI/FormElements/Button";
import {useGetTourListQuery} from "@/store/tours/toursApiSlice";
import {stringDataToString} from "@/helpers/DateToString";

interface IProps {
    application:Application
    onRemove:(id:number)=>void
    onSave:(id:number,tourId:number)=>void
}

const ApplicationItem:FC<IProps> = ({application,onSave,onRemove}) => {
    const [open,setOpen] = useState<boolean>(false)
    const [currentTour,setCurrentTour]=useState<number>(-1)
    const {data:tourList} = useGetTourListQuery()
    const tourOptionalList = useMemo(()=>{
        if(!tourList) return []
        return tourList.map((tour)=>({
          value:tour.id,
          label:tour.place.name+' '+stringDataToString(tour.datesFrom)+' - '+stringDataToString(tour.datesTo)
        }))
    },[tourList])
    useEffect(()=>{
        setCurrentTour(application.toursId)
    },[])
    return (
        <div className={styles.application}>
            <div className={styles.application__top}>
                <p>{application.fio}</p>
                <button onClick={()=>{setOpen((open)=>(!open))}} className={clsx(styles.application__openBtn,open&&styles.active)}>↓</button>
            </div>
            <div className={clsx(styles.application__content,open&&styles.active )}>
                <p>Тел:{application.phone}</p>
                <p>Коментарий:<br/>{application.comment}</p>
                <div style={{marginTop:"24px"}}>
                    <Select value={currentTour} onChange={(event)=>{setCurrentTour(+event.target.value)}} list={tourOptionalList} label={'Выбранный тур'}></Select>
                </div>
                <div className={styles.buttons}>
                    <Button onClick={()=>{onRemove(application.id)}} className={clsx(styles.button,styles.deleteButton)}>Удалить</Button>
                    <Button onClick={()=>{onSave(application.id,currentTour)}} className={clsx(styles.button)}>Сохранить</Button>
                </div>

            </div>
        </div>
    )
};
export default ApplicationItem;