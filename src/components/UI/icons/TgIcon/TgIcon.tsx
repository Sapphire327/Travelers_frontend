import { FC } from 'react'
import styles from "./TgIcon.module.css";
import Image from 'next/image'
import Link from "next/link";
import Icon from "@/components/UI/icons/iconsType";
const TgIcon:FC<Icon> = ({href,alt}) => {
    return (
        <Link target='_blank' className={styles.icon} href={href}>
            <Image alt={alt} src={'/icons/Telegram.png'} width={100} height={100}></Image>
        </Link>
    )
};
export default TgIcon;