import {forwardRef, InputHTMLAttributes} from 'react'
import styles from "./form.module.css";
import clsx from "clsx";
import LabelForElement from "@/components/UI/FormElements/LabelForElement";

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement>{
    label?: string;
}
type MyInputRef = HTMLInputElement;

const Input = forwardRef<MyInputRef,MyInputProps>(({label,id,className,...rest}, ref) => {
    return(
        <LabelForElement htmlFor={id} text={label}>
            <input aria-label={undefined} id={id} ref={ref} {...rest} className={clsx(styles.input, className)}/>
        </LabelForElement>
    )

});
export default Input;