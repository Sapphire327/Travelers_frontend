'use client'
import { FC } from 'react'
import styles from "./page.module.css";
import Title from "@/components/UI/TItle/Title";
import ApplicationItem from "@/components/screens/Applications/Application";
import {Application} from "@/store/applications/applications.types";
import clsx from "clsx";
import Applications from "@/components/screens/Applications/Applications";
import {
    useGetApplicationConsideringListQuery,
} from "@/store/applications/applicationsApiSlice";
import Loader from "@/components/UI/Loader/Loader";



const page:FC = () => {
    const {data:applications} = useGetApplicationConsideringListQuery()
    // const applications:Application[] = [{
    //     id:1,
    //     fio:'Сараджанц Сергей Азатович',
    //     status:'APPROVER',
    //     comment:'Lorem r rew r wrejpew wot nwotnwo twnt owtnwrojt wotnw trowj ntowrntowrnt owtnowtnowtnwoitgw',
    //     phone:'+79289328776',
    //     tourId:4
    //     }]
    return (
        <div className={clsx('container')}>
            {applications?<Applications applications={applications}></Applications>:<Loader/>}
        </div>
    )
};
export default page;