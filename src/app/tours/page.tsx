'use client'
import { FC } from 'react'
import styles from "./page.module.css";
import Title from "@/components/UI/TItle/Title";
import BackgroundSticks from "@/components/UI/BackgroundSticks/BackgroundSticks";
import TourElement from "@/components/screens/TourElement/TourElement";
import {tours} from "@/app/Data";
import {useGetPublicTourQuery} from "@/store/tours/toursApiSlice";
import Loader from "@/components/UI/Loader/Loader";

const page:FC = () => {
    const {data} = useGetPublicTourQuery()
    return (
        <BackgroundSticks>
        <div className='container'>
                <div className={styles.tours}>
                    <Title text={'Туры'}/>
                    <div className={styles.tours__list}>
                        {data?data.map((tour)=>( <TourElement key={tour.id} tour={tour} />)):
                        <Loader/>}

                    </div>
                </div>
        </div>
        </BackgroundSticks>

    )
};
export default page;