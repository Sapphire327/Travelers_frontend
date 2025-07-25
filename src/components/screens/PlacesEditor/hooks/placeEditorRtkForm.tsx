import {SubmitHandler, useForm} from "react-hook-form";
import {
    useChangePlaceMutation,
    useCreatePlaceMutation,
    useDeletePlaceMutation,
    useGetPlaceByIdQuery
} from "@/store/places/placesApiSlice";
import {ChangeEvent, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {getMessageFromError, isErrorWithZodErrors} from "@/store/helpers/errorPredicates";
import {useRouter} from "next/navigation";
type FormValues = {
    preview?: FileList
    images: File[]
    name: string
    description: string
    mapCode?: string
    otherInfo?: string
}
interface IProps {
    id?: number
}


export const placeEditorRtkForm = ({id}: IProps) => {
    const {
        register,
        watch,
        setValue,
        handleSubmit,
        formState: {errors: formErrors}
    } = useForm<FormValues>({defaultValues: {images: []}});
    const router = useRouter();
    const {data, refetch, error: FetchPlaceError} = useGetPlaceByIdQuery(id || -1, {skip: id == undefined})

    const [previewImages, setPreviewImages] = useState<string>();
    const [galleryImagesFromServer, setGalleryImagesFromServer] = useState<string[]>([]);
    const preview = watch('preview');
    const images = watch('images');
    const [urlLocalImages, setUrlLocalImages] = useState<Map<File, string>>(new Map())

    const imgServerUrl = process.env.NEXT_PUBLIC_SERVER_IMAGE_URL || ''
    const [createPlace, {isSuccess}] = useCreatePlaceMutation()
    const [changePlace] = useChangePlaceMutation()
    const [deletePlace] = useDeletePlaceMutation()
    const [imageOnDelete, setImageOnDelete] = useState<string[]>([])

    useEffect(() => {
        if (preview && preview.length > 0) {
            if (previewImages) URL.revokeObjectURL(previewImages)
            setPreviewImages(URL.createObjectURL(preview[0])); // Сохраняем новые превьюшечки
        }
    }, [preview]);
    useEffect(() => {
        if (data && !FetchPlaceError) {
            setImageOnDelete([])
            setValue('images', [])
            setValue('preview', undefined)
            setValue('name', data.name)
            setValue('description', data.description)
            setValue('mapCode', data.mapCode)
            setValue('otherInfo', data.otherInfo)
            setPreviewImages(imgServerUrl + '/' + data.preview)
            if (data.images)
                setGalleryImagesFromServer(data.images)
        }
    }, [data]);
    useEffect(() => {
        if (FetchPlaceError)
            toast.error(getMessageFromError(FetchPlaceError))
    }, [FetchPlaceError])

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) return;
        const newFiles = Array.from(event.target.files);
        newFiles.forEach((file) => {
            setUrlLocalImages(map => new Map(map.set(file, URL.createObjectURL(file))))
        })
        setValue('images', [...images, ...newFiles])
    };
    const deleteLocalImg = (file: File) => {
        const url = urlLocalImages.get(file)
        if (url) {
            URL.revokeObjectURL(url)
            const updatedMap = new Map(urlLocalImages);
            updatedMap.delete(file)
            setUrlLocalImages(updatedMap)
        }
        setValue('images', [...images.filter((val, index) => val != file)])
    }
    const deleteServerImg = (img: string) => {
        setImageOnDelete((images) => {
            if (!images.find(x => x == img)) {
                return [...images, img]
            }
            return [...images]
        })
    }
    const cancelServerImg = (img: string) => {
        setImageOnDelete((images) => {
            return images.filter(x => x != img)
        })
    }
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            if (!id) {
                const res = await createPlace({
                    ...(data.preview && {preview: data.preview[0]}),
                    name: data.name,
                    description: data.description,
                    images: data.images,
                    mapCode: data.mapCode,
                    otherInfo: data.otherInfo
                })
                if (res.error) {
                    toast.error(getMessageFromError(res.error))
                } else {
                    toast.success('Запись успешно добавлена')
                    router.push('/admin/places/')
                }
            } else {
                const res = await changePlace({
                    ...(data.preview && {preview: data.preview[0]}),
                    name: data.name,
                    description: data.description,
                    images: data.images,
                    mapCode: data.mapCode,
                    otherInfo: data.otherInfo,
                    id: id,
                    ...(imageOnDelete.length > 0 && {deleteImages: imageOnDelete})
                })
                if (!res.error) {
                    refetch()
                    toast.success('Запись успешно обновлена')
                } else {
                    console.log(res.error)
                }
            }
        } catch (e) {
        }
    }
    const DeletePlace = async () => {
        if (id) {
            const res = await deletePlace(id)
            if (!res.error) {
                toast.success('Место успешно удалено')
                router.push('/admin/places/')
            }
        }
    }

    return {
        data,
        handleSubmit,
        onSubmit,
        register,
        previewImages,
        images,
        galleryImagesFromServer,
        imageOnDelete,
        deleteServerImg,
        imgServerUrl,
        deleteLocalImg,
        cancelServerImg,
        urlLocalImages,
        handleFileChange,
        DeletePlace
    }

}