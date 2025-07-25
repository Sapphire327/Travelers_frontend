import { FC } from 'react'
import styles from "./title.module.css";
interface IProps{
    text:string
}
const title:FC<IProps> = ({text}) => {
    return (
        <h2 className={styles.title} >
            {text}
        </h2>
    )
};
export default title;