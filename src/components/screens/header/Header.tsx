'use client'
import {FC, useState} from 'react'
import styles from "./header.module.css";
import clsx from 'clsx';
import Link from "next/link";
const Header:FC = () => {
    const [isOpenBurger,setIsOpenBurger] = useState<boolean>(false)
    const closeBurger=()=>{setIsOpenBurger(false)}
    return (
        <header className={clsx(styles.header, isOpenBurger&&styles.active)}>
            <button onClick={()=>{setIsOpenBurger((val)=>{return !val})}} className={clsx(styles.header__burger,isOpenBurger&&styles.active)}>
                <span></span>
            </button>
            <div className={clsx('grid container', styles.header__body,isOpenBurger&&styles.active)}>
                <Link onClick={closeBurger} className={clsx('link', styles.header__link,styles.logo)} href={'/'}>Travelers</Link>
                <nav className={styles.header__nav}>
                    <ul className={styles.header__linkList}>
                        <li><Link onClick={closeBurger} className={clsx('link', styles.header__link)} href={'/tours'}>Туры</Link></li>
                        <li><Link onClick={closeBurger} className={clsx('link', styles.header__link)} href={'/#benefits'}>Преимущества</Link></li>
                        <li><Link onClick={closeBurger} className={clsx('link', styles.header__link)} href={'/#reviews'}>Отзывы</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
};
export default Header;