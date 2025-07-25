'use client'
import {FC, useState} from 'react'
import styles from "./footer.module.css";
import clsx from 'clsx';
import Link from "next/link";
const Footer:FC = () => {
   return(
       <footer className={styles.footer}>
           <div>
               <h2 className={styles.footer__title}>Travelers</h2>
               <p className={styles.footer__text}>Pet - проект. Автор - Сараджанц Сергей</p>
               <p className={styles.footer__text}>почта: nochnoy_briz@mail.ru</p>
           </div>
       </footer>
   )
};
export default Footer;