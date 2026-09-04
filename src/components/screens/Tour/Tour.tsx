'use client'
import SendApplicationForm from "@/components/screens/SendApplicationForm/SendApplicationForm"
import Loader from "@/components/UI/Loader/Loader"
import Title from "@/components/UI/TItle/Title"
import { useGetPublicTourByIdQuery } from "@/store/tours/toursApiSlice"
import clsx from "clsx"
import { FC } from 'react'
import styles from "./tour.module.css"



const tour:FC<{id:number}> = ({id}) => {
    const {data} = useGetPublicTourByIdQuery(+id)
    const imgUrl = process.env.NEXT_PUBLIC_SERVER_IMAGE_URL? process.env.NEXT_PUBLIC_SERVER_IMAGE_URL+'/':''

    return (
        <div style={{marginBottom:"100px"}}>
            {data?<div className='container'>
                <div className={styles.tour}>
                    <Title text={data.place.name}/>
                    <p className={styles.text}>{data.place.description}</p>
                    <div className={styles.gallery}>
                        {data.place.images&&data.place.images.map((img,i)=><img className={styles.gallery__img} key={i} src={imgUrl} alt={''}></img>)}
                    </div>
                    <div className={styles.tour__map}>
                        <Title text='Маршрут'/>
                        <iframe className={styles.tour__iframeMap}
                                src={`https://yandex.ru/map-widget/v1/?um=constructor%${data.place.mapCode}`}
                                width="100%" height="400" frameBorder="0"></iframe>
                    </div>
                    <div className={clsx(styles.tour__info, styles.text)}>
                        <p>Место старта:{data.startPlace}</p>
                        <p>Количество свободных мест:{data.maxPeople - data.currentPeople}</p>
                        <p>Группа:{data.maxPeople}</p>
                        <p>Цена:{data.price}руб.</p>
                        <p>{data.place.otherInfo}</p>
                    </div>
                </div>

                <p style={{marginBottom:"28px"}} className={styles.text}>Оставьте заявку на участие в этом туре</p>
                <SendApplicationForm id={id}/>
            </div>:<Loader/>}
        </div>
    )
};
export default tour;