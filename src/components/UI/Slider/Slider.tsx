'use client'
import React, {FC, ReactNode, useEffect, useState} from 'react'
import styles from "./Slider.module.css";
import useEmblaCarousel from "embla-carousel-react";
import SliderDots from "@/components/UI/Slider/SliderDots";
import styled from "styled-components";

interface widthCount{
    windowWidth: number;
    count:number;
}

interface IProps{
    children:ReactNode,
    countOnShow?: widthCount[],
    gap?:string
}

const Wrap = styled.div<{countonshow: widthCount[],gap:string}>`
    ${({countonshow,gap})=>{
        return countonshow.map((value)=>{
            return `@media(max-width:${value.windowWidth}px){
           flex:calc(${100/value.count}% - ${gap} * 2) 0 0
        }`
        })
    }}
`


const Slider:FC<IProps> = ({children,countOnShow=[{count:1,windowWidth:1600}],gap="15px"}) => {
    const [emblaRef,emblaApi] = useEmblaCarousel({
        loop:true,
        slidesToScroll:1
    })
    useEffect(() => {
        emblaApi?.selectedScrollSnap()
    }, []);
    return (
        <div className={styles.sliderWrap}>
            <div className={styles.embla} ref={emblaRef}>
                <div className={styles.embla__container}>
                    {React.Children.map(children, (child, i) => {
                        return <Wrap countonshow={countOnShow} gap={gap} key={i}>{child}</Wrap>
                    })}
                </div>
            </div>
            <SliderDots emblaApi={emblaApi}></SliderDots>
        </div>
    )
};
export default Slider;