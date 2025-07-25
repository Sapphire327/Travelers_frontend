import { FC } from 'react'
import styles from "./Review.module.css";

export interface IReview{
    author:string
    text:string
}

const Review:FC<IReview> = ({text,author}) => {
    return (
        <div className={styles.review}>
            <p className={styles.review__author}>{author}</p>
            <p className={styles.review__text}>{text}</p>
        </div>
    )
};
export default Review;