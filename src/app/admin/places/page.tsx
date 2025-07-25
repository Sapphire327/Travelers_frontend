'use client'
import {FC, useEffect} from 'react'
import styles from "./page.module.css";
import Title from "@/components/UI/TItle/Title";
import {useGetPlaceListQuery} from "@/store/places/placesApiSlice";
import clsx from "clsx";
import Link from "next/link";
import Loader from "@/components/UI/Loader/Loader";


const page:FC = () => {
    const {data,isLoading,status,error} = useGetPlaceListQuery()
    return (
        <div className={styles.places}>
            <ul className={styles.placesList}>
                {data?data.map((place)=>{return(
                    <li key={place.id} className={styles.placesList__element}>
                        <p className={styles.placesList__name}>{place.name}</p>
                        <Link href={`/admin/places/edit/${place.id}`} className={clsx('ButtonLink',styles.placeList__link)}>Изменить</Link>
                    </li>
                )}):<Loader/>}
            </ul>
            <Link href='/admin/places/edit' className={clsx('ButtonLink', styles.createButton)}>Добавить новое место</Link>
        </div>
    )
};
export default page;