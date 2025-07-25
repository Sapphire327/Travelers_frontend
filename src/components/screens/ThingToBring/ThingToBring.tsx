import { FC } from 'react'
import styles from "./ThingToBring.module.css";
import Image from 'next/image'
import Blackout from "@/components/UI/Blackout/Blackout";
interface Props{
    imagePath:string
    text:string
}

const ThingToBring:FC<Props> = ({text,imagePath}) => {
    return (
        <div className={styles.card}>
            <Blackout colorTo={'rgba(64, 64, 68, 0.4))'}><Image width={311} height={421} className={styles.card__img} alt={''} src={imagePath}></Image></Blackout>
            <p className={styles.card__text}>{text}</p>
        </div>
    )
};
export default ThingToBring;