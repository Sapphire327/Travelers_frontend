'use client'
import {FC, useEffect} from 'react'
import styles from "./page.module.css";
import Title from "@/components/UI/TItle/Title";
import clsx from "clsx";
import Link from "next/link";
import Loader from "@/components/UI/Loader/Loader";
import {useGetTourListQuery} from "@/store/tours/toursApiSlice";
import {dataToString, stringDataToString} from "@/helpers/DateToString";
import Button from "@/components/UI/FormElements/Button";
import PlacesListElement from "@/app/admin/tours/PlacesListElement";


const page:FC = () => {
    const {data,isLoading,status,error} = useGetTourListQuery()
    return (
        <div className={styles.tours}>
            <ul className={styles.placesList}>
                {data?data.map((tour)=>{return(
                    <li key={tour.id}>
                        <PlacesListElement tour={tour}/>
                    </li>
                )
                }) : <Loader/>}
            </ul>
            <Link href='/admin/tours/edit' className={clsx('ButtonLink', styles.createButton)}>Добавить новый тур</Link>
        </div>
    )
};
export default page;