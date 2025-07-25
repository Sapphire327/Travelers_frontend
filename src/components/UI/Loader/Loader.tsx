import { FC } from 'react'
import Image from 'next/image'
import styles from './loader.module.css'
const Loader:FC = () => {
    return (
        <div className={styles.wrapper}>
            <Image width={100} height={100} src='/others/loader.gif' alt={'Идёт загрузка'}></Image>
            <p style={{color:"white"}}>Идёт загрузка...</p>
        </div>
    )
};
export default Loader;