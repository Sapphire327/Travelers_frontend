import {FC, useState} from 'react'
import styles from "./modal.module.css";
import {createPortal} from "react-dom";

interface IProps {
    isOpen: boolean;
    children: React.ReactNode;
    width?: string;
    height?: string;
    backgroundColor?: string;
    closeButton?: boolean;
    onCloseButtonClick?: () => void
}

const Modal: FC<IProps> = ({
                               isOpen,
                               children,
                               width = "500px",
                               height = "300px",
                               backgroundColor = '#151C24',
                               onCloseButtonClick
}) => {
    return (
        isOpen && createPortal(
            <div className={styles.modalWrap}>
                <div className={styles.modal} style={{width, height, backgroundColor}}>
                    {onCloseButtonClick&&<button onClick={()=>onCloseButtonClick()} className={styles.closeBtn}>X</button>}
                    {children}
                </div>
            </div>,
            document.body
        )
    )
};
export default Modal;