import {IPlaceGetDto} from "@/store/places/places.types";
import {Application} from "@/store/applications/applications.types";

export type ITourCreateDto = {
    datesFrom:Date,
    datesTo:Date,
    maxPeople:number,
    startPlace:string,
    price:number,
    placesId:number,
}
export type ITourUpdateDto = ITourCreateDto&{id:number}
export interface ITourGetDto{
    id:number
    datesFrom:string
    datesTo:string
    maxPeople:number
    startPlace:string
    price:number
    place:{id:number, name:string}
}

export interface ITourElement{
    id:number,
    place:{name:string},
    datesFrom:string,
    datesTo:string,
    applications:Application[]
}

export interface ITourPublic {
    id: number;
    imgPath: string;
    name: string;
    datesFrom: string;
    datesTo: string;
    maxPeople: number;
    currentPeople: number;
}
export interface ITourPublicById {
    id: number;
    datesFrom: string;
    datesTo: string;
    price:number;
    startPlace:string,
    maxPeople: number;
    currentPeople:number;
    place:IPlaceGetDto
}
