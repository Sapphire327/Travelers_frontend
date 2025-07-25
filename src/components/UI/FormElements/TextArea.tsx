import {forwardRef, InputHTMLAttributes, TextareaHTMLAttributes} from 'react'
import styles from "./form.module.css";
import clsx from "clsx";
import LabelForElement from "@/components/UI/FormElements/LabelForElement";

interface MyTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    label?: string;
    children?: React.ReactNode;
}
type MyTextAreaRef = HTMLTextAreaElement;

const TextArea = forwardRef<MyTextAreaRef,MyTextAreaProps>(({label,children,id,className,...rest}, ref) => {
    return(
        <LabelForElement htmlFor={id} text={label}>
            <textarea aria-label={label} id={id} ref={ref} {...rest} className={clsx(styles.input,styles.textarea, className)}>{children}</textarea>
        </LabelForElement>
    )

});
export default TextArea;