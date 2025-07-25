import { FC } from 'react'
import styles from "./Guide.module.css";
import Image from 'next/image'
export interface IGuide{
    name:string,
    imgPath:string,
    numeric?:number,
    description:string,
}

const Guide:FC<IGuide> = ({imgPath,name,numeric,description}) => {
    return (
        <div className={styles.guideCard}>
            {numeric&&<p className={styles.guideCard__numeric}>{numeric}</p>}
            <div className={styles.guideCard__body}>
                <Image className={styles.img} width={390} height={437} alt={name} src={imgPath}/>
                <div className={styles.guideCard__info}>
                    <p className={styles.guideCard__name}>{name}</p>
                    <p className={styles.guideCard__description}>{description}</p>
                </div>
            </div>
        </div>
    )
};
export default Guide;