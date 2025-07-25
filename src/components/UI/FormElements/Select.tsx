import {forwardRef, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes} from 'react'
import styles from "./form.module.css";
import clsx from "clsx";
import LabelForElement from "@/components/UI/FormElements/LabelForElement";

interface IOption{
    label: string;
    value: any;
}

interface MySelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    label?: string;
    noChoiceText?: string;
    list?:IOption[]
}
type MySelectRef = HTMLSelectElement;

const Select = forwardRef<MySelectRef,MySelectProps>(({label,id,className,noChoiceText,list,...rest}, ref) => {
    return(
        <LabelForElement htmlFor={id} text={label}>
            <select aria-label={label} id={id} ref={ref}  {...rest} className={clsx(styles.input, styles.select, className)}>
                {noChoiceText&&<option style={{display: "none"}} value={-1} disabled hidden>{noChoiceText}</option>}
                {
                    list?.map((el)=> (
                        <option key={el.value} value={el.value}>{el.label}</option>
                    ))
                }
            </select>
        </LabelForElement>
    )

});
export default Select;