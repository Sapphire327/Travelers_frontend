'use client'
import styles from "./placesEditor.module.css";
import {FC, useState} from 'react'
import ImageLoader from "@/components/UI/imageLoader/ImageLoader";
import clsx from "clsx";
import Loader from "@/components/UI/Loader/Loader";
import {useRouter} from "next/navigation";
import ConfirmModal from "@/components/UI/ConfirmModal/ConfirmModal";
import Input from "@/components/UI/FormElements/Input";
import TextArea from "@/components/UI/FormElements/TextArea";
import {placeEditorRtkForm} from "@/components/screens/PlacesEditor/hooks/placeEditorRtkForm";
import Link from "next/link";
import Button from "@/components/UI/FormElements/Button";
interface IProps {
    id?: number
}

const PlacesEditor: FC<IProps> = ({id}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const {
        data,
        handleSubmit,
        onSubmit,
        register,
        previewImages,
        images,
        galleryImagesFromServer,
        imageOnDelete,
        deleteServerImg,
        deleteLocalImg,
        imgServerUrl,
        cancelServerImg,
        urlLocalImages,
        handleFileChange,
        DeletePlace
    } = placeEditorRtkForm({id})
    return (
        <div className={styles.places}>
            {(id != undefined && !data) ?
                <Loader/> :
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form} encType="multipart/form-data">
                    <Input label={'Название места'} required {...register('name', {required: "Введите название места"})} type="text" ></Input>
                    <TextArea label={'Описание места'} required {...register('description')} rows={7} wrap='hard'></TextArea>
                    <div className={styles.mapCode}>
                        <Input label={'Код карты'} {...register('mapCode')}  type="text" ></Input>
                        <Link target="_blank" className={styles.getInstructionBtn} href='/admin/mapInstructions'>Как получить код карты</Link>
                    </div>
                    <TextArea label={'Доп информация'} {...register('otherInfo')} rows={7} wrap='hard'></TextArea>

                    {previewImages && <img src={previewImages} alt={`preview`} className={styles.preview}/>}
                    <ImageLoader {...register('preview')} text="Загрузить превью"/>
                    {(images && images.length > 0 || galleryImagesFromServer.length > 0) &&
                        <div className={styles.gallery}>
                            {galleryImagesFromServer.map(value => {
                                let isOnDelete = imageOnDelete.find(x => x == value);
                                return (
                                    <div key={value}  className={clsx(styles.gallery__img, isOnDelete && styles.imgOnDelete)}>
                                        {!isOnDelete && <button onClick={() => deleteServerImg(value)} className={styles.gallery__DeleteBtn}>X</button>}
                                        <img src={imgServerUrl + '/' + value} alt=""/>
                                        {isOnDelete && <button onClick={() => cancelServerImg(value)}  className={clsx('button', styles.cancelDeleteButton)}>Отменить удаление</button>}
                                    </div>)
                            })}
                            {images?.map((value, index) => {
                                return (
                                    <div key={value.name} className={styles.gallery__img}>
                                        <button onClick={() => deleteLocalImg(value)}
                                                className={styles.gallery__DeleteBtn}>X
                                        </button>
                                        <img src={urlLocalImages.get(value)} alt=""/>
                                    </div>)
                            })}
                        </div>}
                    <ImageLoader onChange={handleFileChange} text="Добавить фото" multiple/>
                    {
                        (id == undefined) ?
                            <Button type="submit" className={clsx('button', styles.sendButton)}>Добавить место</Button>:
                            <div>
                                <Button type="submit" className={clsx('button', styles.sendButton)}>Сохранить изменения</Button>
                                <Button type="button" onClick={() => {
                                    setIsModalOpen(true)
                                }} className={clsx('button_red', styles.deleteButton)}>Удалить место</Button>
                            </div>
                    }
                </form>
            }
            <ConfirmModal acceptButtonColor={"#611e1e"} isModalOpen={isModalOpen} onDeny={()=>{setIsModalOpen(false)}} onAccept={DeletePlace} acceptButtonText={"Удалить"} denyButtonText={"Отмена"}  text={["Вы уверены что хотите удалить эту запись?","Связанные с ней туры также будут удалены"]}/>
        </div>
    )
};
export default PlacesEditor;