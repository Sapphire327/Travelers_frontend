import {ButtonHTMLAttributes, FC} from 'react'
import styles from "./form.module.css";
import clsx from "clsx";
interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children?:React.ReactNode,
}

const Button:FC<IProps> = ({children,className,...rest}) => {
    return (
        <button className={clsx(styles.button, className)} {...rest}>{children}</button>
    )
};
export default Button;