import {FC, useState} from 'react'
import styles from "./placesList.module.css";
import {stringDataToString} from "@/helpers/DateToString";
import Link from "next/link";
import clsx from "clsx";
import {ITourElement} from "@/store/tours/tours.types";
import Applications from "@/components/screens/Applications/Applications";
import Button from "@/components/UI/FormElements/Button";

const PlacesListElement:FC<{tour:ITourElement}> = ({tour}) => {
    const [isAppListOpen,setIsAppListOpen ] = useState<boolean>(false)
    function closeOpenList(){
        setIsAppListOpen((isOpen)=>(!isOpen))
    }
    return (
        <div className={styles.placesList}>
            <div className={styles.placesList__info}>
                <div>
                    <p className={styles.placesList__name}>{tour.place.name}</p>
                    <p className={styles.placesList__name}>{stringDataToString(tour.datesFrom)} - {stringDataToString(tour.datesTo)}</p>
                </div>
                <div>
                    <Link href={`/admin/tours/edit/${tour.id}`}
                          className={clsx('ButtonLink', styles.placeList__link)}>Изменить</Link>
                    <Button onClick={closeOpenList} className={styles.placeList__applicationListBtn}>Список заявок</Button>
                </div>


            </div>
            <div className={styles.placesList__applications}>
                    {isAppListOpen&&<div className={styles.placesList__applicationsList}>
                        {
                            tour.applications.length>0?
                                <Applications applications={tour.applications}></Applications>:
                                <p className={styles.placesList__text}>Заявок нет</p>
                        }
                    </div>
                    }
            </div>
        </div>
    )
};
export default PlacesListElement;