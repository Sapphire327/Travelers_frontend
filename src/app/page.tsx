import React from "react";
import styles from "./page.module.css";
import clsx from "clsx";
import Link from "next/link";
import TgIcon from "@/components/UI/icons/TgIcon/TgIcon";
import Guide from "@/components/screens/guide/Guide";
import Slider from "@/components/UI/Slider/Slider";
import Image from 'next/image'
import Statistic from "@/components/screens/statistic/Statistic";
import {places, guides, toBring, Comments} from "@/app/Data";
import ThingToBring from "@/components/screens/ThingToBring/ThingToBring";
import Blackout from "@/components/UI/Blackout/Blackout";
import Review from "@/components/screens/Review/Review";
import Title from "@/components/UI/TItle/Title";
import BackgroundSticks from "@/components/UI/BackgroundSticks/BackgroundSticks";
export default function Home() {
    return (
        <div>
            <div className={clsx('grid', styles.top)}>
                <h1 className={styles.top__title}>ВЫБЕРИ<br/>СВОЙ ПУТЬ<br/>К ПРИРОДЕ</h1>
                <div className={styles.top__links}>
                    <Link className={clsx(styles.top__go)} href={'/'}>Go с нами</Link>
                    <TgIcon href={'https://web.telegram.org/k/'} alt={''}></TgIcon>
                </div>
            </div>
            <BackgroundSticks >
                <div className={clsx(styles.mainInfo, 'container')}>
                    <div className={styles.guidBlock}>
                        <Title text='Наши гиды'/>
                        <div className={styles.slider}>
                            <Slider>
                                {guides.map((guide) => {
                                    return <Guide key={guide.numeric} {...guide}></Guide>
                                })}
                            </Slider>
                        </div>
                    </div>
                    <div className={styles.PopularBlock}>
                        <Title text='Популярные направления'/>
                        <div className={styles.places}>
                            <Slider>
                                {places.map((place) => {
                                    return <div key={place.id} className={styles.place}>
                                        <Blackout colorTo={'rgba(64, 64, 68, 0.4))'}><Image width={2048} height={840}
                                                                                            src={place.imgPath}
                                                                                            alt={place.name}/></Blackout>
                                        <p>{place.name}</p>
                                    </div>
                                })}
                            </Slider>
                        </div>
                    </div>
                    <div  id='benefits' className={styles.statistic}>
                        <Statistic/>
                    </div>
                </div>
                <div className={styles.toBring}>
                    <div className='container'>
                        <Title text='Что взять с собой'/>
                        <div className={styles.placesSlider}>
                            <Slider countOnShow={[{count:3,windowWidth:8000},{count:1,windowWidth:768}]}>
                                {toBring.map((thing)=><ThingToBring imagePath={thing.imgPath} text={thing.name} key={thing.id} />)}
                            </Slider>
                        </div>
                    </div>
                </div>
            </BackgroundSticks>
            <div id='reviews' className={'container'}>
                <Title text='Отзывы'/>
                <div className={clsx(styles.reviews)}>
                    {Comments.map((review, index) =>
                        <div className={styles.review} key={index}>
                            <Review key={index} author={review.author} text={review.text}/>
                        </div>)}
                </div>
            </div>
        </div>
    );
}
