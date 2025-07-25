import {RefObject, useEffect} from "react";
import {animate, useInView, useMotionValue, useTransform} from "framer-motion";
import {AnimationPlaybackControlsWithThen} from "motion";

export const useNumberViewAnimation=(ref:RefObject<any>,from:number,to:number,time:number)=>{
    const inView = useInView(ref, { once: true });
    const fullNumber = useMotionValue(from)
    const number = useTransform(() => Math.round(fullNumber.get()))

    useEffect(() => {
        let controls:AnimationPlaybackControlsWithThen= animate(fullNumber, to, { duration: time,ease:"easeInOut",autoplay:false})
        if (inView) {
            controls.play()
        }
        return()=>{
            controls.stop()
        }
    }, [inView]);
    return {number}
}