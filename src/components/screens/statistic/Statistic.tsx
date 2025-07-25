'use client'
import {FC, useEffect, useRef} from 'react'
import styles from "./Statistic.module.css";
import {useMotionValue, animate, motion, useTransform} from "framer-motion";
import {useNumberViewAnimation} from "@/hooks/useNumberViewAnimation";

const Statistic:FC = () => {
    const expRef = useRef<any>(null)
    const routesRef = useRef<any>(null)
    const groupsRef = useRef<any>(null)
    const clientsRef = useRef<any>(null)
    const {number:exp} = useNumberViewAnimation(expRef,0,10,1)
    const {number:routes} = useNumberViewAnimation(routesRef,0,50,2)
    const {number:groups} = useNumberViewAnimation(groupsRef,0,7,2)
    const {number:clients} = useNumberViewAnimation(clientsRef,0,500,3)
    return (
        <div className={styles.info}>
            <div className={styles.impressions}>
                <h2 className={styles.impressions__title}>Незабываемые впечатления</h2>
                <p className={styles.impressions__text}>
                    Наслаждайтесь невероятными видами, узнавайте новое о культуре и природе своей страны, заряжайтесь
                    энергией общения с удивительными людьми и откройте новые горизонты с нашими
                    профессионалами-гидами!<br/><br/>
                    Приходите к нам, чтобы подарить себе незабываемые впечатления и яркие эмоции от настоящего
                    <br/>путешествия по России!
                </p>
            </div>
            <div className={styles.statistics}>
                <div ref={expRef} className={styles.statistic}>
                    <motion.p className={styles.statistic__number}>{exp}</motion.p>
                    <p className={styles.statistic__text}>Более 10 лет опыта. Наши опытные гиды провели сотни успешных
                        туристических мероприятий, накопив огромный багаж знаний и практический опыт</p>
                </div>
                <div ref={routesRef} className={styles.statistic}>
                    <p className={styles.statistic__number}>+<motion.span>{routes}</motion.span></p>
                    <p className={styles.statistic__text}>+50 уникальных маршрутов.
                        Предлагаем широкий ассортимент проверенных маршрутов по лучшим природным зонам России</p>
                </div>
                <div ref={groupsRef} className={styles.statistic}>
                    <motion.p className={styles.statistic__number}>{groups}</motion.p>
                    <p className={styles.statistic__text}>Ходим небольшими группами по 7 человек</p>
                </div>
                <div ref={clientsRef} className={styles.statistic}>
                    <motion.p className={styles.statistic__number}>{clients}</motion.p>
                    <p className={styles.statistic__text}>Каждый год более 500 довольных клиентов, которые возвращаются
                        домой полные впечатлений и энергии</p>
                </div>
            </div>
        </div>
    )
};
export default Statistic;