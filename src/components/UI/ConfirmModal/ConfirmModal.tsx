import {FC} from 'react'
import styles from "./confirmModal.module.css";
import clsx from "clsx";
import Modal from "@/components/UI/Modal/Modal";
import Button from "@/components/UI/FormElements/Button";

interface IProps {
    isModalOpen: boolean;
    text: string[];
    onAccept?: () => void;
    onDeny?: () => void;
    acceptButtonText?: string;
    denyButtonText?: string;
    acceptButtonColor?: string;
    denyButtonColor?: string;

}

const ConfirmModal: FC<IProps> = ({
                                      isModalOpen,
                                      text,
                                      onDeny,
                                      onAccept,
                                      acceptButtonText = "Да",
                                      denyButtonText = "Нет",
                                      acceptButtonColor="#75905e",
                                      denyButtonColor="#75905e",


                                  }) => {
    return (
        <Modal isOpen={isModalOpen} height={"200px"}>
            <div className={styles.deleteModal}>
                <div className={styles.deleteModal__info}>
                    {text.map((t,index) => <p key={index} className={styles.deleteModal__text}>{t}</p>)}
                </div>
                <div className={styles.deleteModal__buttons}>
                    <Button onClick={() => {
                        onAccept?.call(null)
                    }} style={{backgroundColor:acceptButtonColor}} >{acceptButtonText}
                    </Button>
                    <Button onClick={() => {
                        onDeny?.call(null)
                    }}  style={{backgroundColor:denyButtonColor}} >{denyButtonText}
                    </Button>
                </div>
            </div>
        </Modal>
    )
};
export default ConfirmModal;