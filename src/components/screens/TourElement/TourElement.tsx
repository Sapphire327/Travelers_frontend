import Blackout from "@/components/UI/Blackout/Blackout"
import { stringDataToString } from "@/helpers/DateToString"
import { ITourPublic } from "@/store/tours/tours.types"
import clsx from "clsx"
import Link from "next/link"
import { FC } from 'react'
import styles from "./tour.module.css"


const TourElement:FC<{tour:ITourPublic}> = ({tour}) => {
    const {name,currentPeople,maxPeople,datesTo,datesFrom,imgPath,id} = tour
    const imgUrl = process.env.NEXT_PUBLIC_SERVER_IMAGE_URL? process.env.NEXT_PUBLIC_SERVER_IMAGE_URL+'/'+imgPath:imgPath
    return (
        <div className={styles.tour}>
            <div className={styles.tour__background}>
                <Blackout  colorFrom='rgba(64, 64, 68, 0.3)'  colorTo='rgba(64, 64, 68, 0.7)'>
                    <img width={1080} height={420} className={styles.tour__img} alt={name} src={imgUrl}/>
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