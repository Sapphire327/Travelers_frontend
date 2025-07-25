import { FC } from 'react'
import styles from "./tour.module.css";
import Link from "next/link";
import clsx from "clsx";
import Image from 'next/image'
import Blackout from "@/components/UI/Blackout/Blackout";
import {dataToString, stringDataToString} from "@/helpers/DateToString";
import {ITourPublic} from "@/store/tours/tours.types";


const TourElement:FC<{tour:ITourPublic}> = ({tour}) => {
    const {name,currentPeople,maxPeople,datesTo,datesFrom,imgPath,id} = tour
    return (
        <div className={styles.tour}>
            <div className={styles.tour__background}>
                <Blackout  colorFrom='rgba(64, 64, 68, 0.3)'  colorTo='rgba(64, 64, 68, 0.7)'>
                    <img width={1080} height={420} className={styles.tour__img} alt={name} src={process.env.NEXT_PUBLIC_SERVER_IMAGE_URL+'/'+imgPath}/>
                </Blackout>
            </div>
            <div className={styles.tour__info}>
                <p className={styles.text}>{name}</p>
                <p className={styles.text}>Набор группы<br/> осталось мест: {maxPeople - currentPeople} </p>
            </div>
            <div className={styles.tour__bottom}>
                <Link href={`/tours/${id}`} className={clsx('ButtonLink', styles.tour__btn)}>Подробнее</Link>
                <p className={styles.text}>{stringDataToString(datesFrom)} - {stringDataToString(datesTo)}</p>
            </div>
        </div>
    )
};
export default TourElement;