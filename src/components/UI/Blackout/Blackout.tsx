'use client'
import {FC, ReactNode} from 'react'
import styled from 'styled-components';
import styles from "./Blackout.module.css";
interface IProps{
    children:ReactNode,
    deg?:number,
    colorFrom?:string,
    colorTo:string,
    borderRadius?:string
}
const Wrap = styled.div<{deg:number,colorfrom:string,colorto:string,borderradius:string}>`
    width: 100%;
    height: 100%;
    &:after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        border-radius: ${({borderradius})=>borderradius};
        background:linear-gradient( ${({ deg }) => deg}deg, ${({ colorfrom }) => colorfrom}, ${({colorto})=>colorto}) ;
    }
`
const Blackout:FC<IProps> = ({deg=180,children,colorFrom='rgba(0,0,0,0)',colorTo,borderRadius="20px"}) => {
    return (
        <Wrap deg={deg} colorto={colorTo} colorfrom={colorFrom} className={styles.imgWrap} borderradius={borderRadius} >
            {children}
        </Wrap>
    )
};
export default Blackout;