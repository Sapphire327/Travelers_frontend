import {FC, ReactNode} from 'react'
import styles from "./backgroundSticks.module.css";

const BackgroundSticks:FC<{children?:ReactNode}> = ({children}) => {
    return (
        <div className={styles.backgroundStick}>
            {children}
        </div>
    )
};
export default BackgroundSticks;