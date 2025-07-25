import {FC, LabelHTMLAttributes, ReactNode} from 'react'
import styles from "./form.module.css";
import clsx from "clsx";

interface IProps extends LabelHTMLAttributes<HTMLLabelElement>{
    text?:string|undefined,
    children:ReactNode,
}

const LabelForElement:FC<IProps> = ({children,className,text,...rest}) => {
    if(text){
        return (
            <div className={styles.inputWrap}>
                <label {...rest} className={clsx(styles.inputWrap__label,className)}>{text}</label>
                {children}
            </div>
        )
    }else{
        return children
    }
};
export default LabelForElement;