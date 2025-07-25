import {FC} from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

const page:FC = () => {
    return (
        <div className='container'>
            <div className={styles.instruction}>
                <div>
                    <p className={styles.instruction__text}>Перейдите по ссылке <br/>
                        <Link className={styles.instruction__link} target="_blank"
                              href={'https://yandex.ru/map-constructor/'}>https://yandex.ru/map-constructor/</Link>
                    </p>
                    <Image className={styles.instruction__image} alt={''} src={'/mapInstructions/getPath1.png'}
                           width={1200} height={100}></Image>
                </div>

                <div>
                    <p className={styles.instruction__text}>Используя инструменты отобразите ваш путь</p>
                    <Image className={styles.instruction__image} alt={''} src={'/mapInstructions/getPath2.png'}
                           width={1200} height={100}></Image>
                </div>
                <div>
                    <p className={styles.instruction__text}>Введите название пути и нажмите кнопку "Сохранить и
                        продолжить"</p>
                    <Image className={styles.instruction__image} alt={''} src={'/mapInstructions/getPath3.png'}
                           width={1200} height={100}></Image>
                </div>

                <div>
                    <p className={styles.instruction__text}>Выровняйте прямоугольник так, чтобы в нём помещался ваш путь <br/>
                        Скопируйте ссылку на карту и вставьте в поле "Код карты" на вашем сайте</p>
                    <Image className={styles.instruction__image} alt={''} src={'/mapInstructions/getPath4.png'}
                           width={1200} height={100}></Image>
                </div>

            </div>

        </div>
    )
};
export default page;