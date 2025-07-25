'use client'

import React, {FC, ReactNode, useCallback, useEffect, useState} from 'react'
import styles from "./Slider.module.css";
import {EmblaCarouselType} from "embla-carousel";
import clsx from "clsx";

interface ISliderDots {
    emblaApi: EmblaCarouselType|undefined,
}

const SliderDots:FC<ISliderDots> = ({emblaApi}) => {
    const [selectedDot,setSelectedDot] = useState<number>(0)
    const [dotCount,setDotCount] = useState<number>(0)
    const onDotClick=(index:number)=>{
        emblaApi?.scrollTo(index);
        setSelectedDot(index)
    }
    const onSelect=useCallback((emblaApi: EmblaCarouselType)=>{
        setSelectedDot(emblaApi.selectedScrollSnap)
    },[])
    useEffect(()=>{
        if(emblaApi)
            setDotCount(emblaApi?.scrollSnapList()?.length)
        emblaApi?.on('select',onSelect)
        return()=>{
            emblaApi?.off('select',onSelect)
        }
    },[emblaApi])

    return (
        <div className={styles.dots}>
            {
                [...Array(dotCount).keys()].map(((item, index) => {
                    return <div key={index}>
                        <button key={index} onClick={() => onDotClick(index)}
                                className={clsx(styles.dot, index === selectedDot && styles.active)}></button>
                    </div>
                }))
            }
        </div>
    )
};
export default SliderDots;