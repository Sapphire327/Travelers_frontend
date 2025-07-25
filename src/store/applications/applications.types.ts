import {IPlaceGetDto} from "@/store/places/places.types";

export type IApplicationCreateDto = {
    phone:string
    fio:string
    comment:string
    toursId:number
}
export type IApplicationPatchDto = {
    id:number
    toursId:number
}
export interface Application{
    id:number,
    fio:string,
    status:string,
    phone:string,
    comment:string,
    toursId:number
}
