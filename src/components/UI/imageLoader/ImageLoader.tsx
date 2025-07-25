import { FC } from 'react'
import styles from "./ImageLoader.module.css";
interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    text?: string;
}
const ImageLoader:FC<CustomInputProps> = (props) => {
    const {text, ...rest} = props
    return (
        <div className={styles.wrapper}>
            <label htmlFor="" className={styles.label}>
                <input className={styles.file} {...rest} type='file'/>
                <span className={styles.span}>{text}</span>
            </label>
        </div>
    )
};
export default ImageLoader;