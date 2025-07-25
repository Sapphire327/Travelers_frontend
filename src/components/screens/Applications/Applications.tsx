import { FC } from 'react'
import styles from "./application.module.css";
import {Application} from "@/store/applications/applications.types";
import ApplicationItem from "@/components/screens/Applications/Application";
import {useCommitApplicationMutation, useDeleteApplicationMutation} from "@/store/applications/applicationsApiSlice";
import {toast} from "react-toastify";
import {getMessageFromError} from "@/store/helpers/errorPredicates";

interface IProps{
    applications: Application[];
}
const application:FC <IProps>= ({applications}) => {
    const [commitApplication] = useCommitApplicationMutation()
    const [deleteApplication] = useDeleteApplicationMutation()
    const onSave =async (id:number,toursId:number)=>{
        const response = await commitApplication({id,toursId})
        if(response.error){
            toast.error(getMessageFromError(response.error))
        }else{
            toast.success('Запись успешно сохранена и будет находиться в разделе заявок выбраного тура')
        }
    }
    const onRemove=(id:number)=>{
        deleteApplication(id)
    }
    return (
        <div className={styles.applications}>
            {applications.map((app)=>(
                <ApplicationItem key={app.id} application={app} onRemove={onRemove} onSave={onSave}></ApplicationItem>
            ))}
        </div>
    )
};
export default application;