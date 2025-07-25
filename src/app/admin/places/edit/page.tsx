'use client'
import {ChangeEvent, FC, useEffect, useState} from 'react'
import styles from "./page.module.css";
import PlacesEditor from "@/components/screens/PlacesEditor/PlacesEditor";

const page:FC = () => {

   return <div style={{marginBottom:"50px"}}>
      <PlacesEditor></PlacesEditor>
   </div>
};
export default page;