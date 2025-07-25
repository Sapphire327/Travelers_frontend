import { FC } from 'react'
import styles from "./page.module.css";
import BackgroundSticks from "@/components/UI/BackgroundSticks/BackgroundSticks";
import Tour from "@/components/screens/Tour/Tour";

const page:FC<{params: Promise<{ id: string }>}> = async({params}) => {
    const { id } = await params
    return (
        <BackgroundSticks>
            <div style={{paddingTop:"100px"}}>
                <Tour id={+id} ></Tour>
            </div>
        </BackgroundSticks>

    )
};
export default page;