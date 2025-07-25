export interface IPlaceCreateDto{
    name:string
    description:string
    preview?:File
    images?:File[]
    mapCode?:string
    otherInfo?:string
}

export interface IPlaceGetDto{
    id:number
    name:string
    description:string
    preview?:string
    images?:string[]
    mapCode?:string
    otherInfo?:string
}
export interface IPlaceChangeDto extends IPlaceCreateDto{
    id:number,
    deleteImages?:string[]
}

export interface IPlaceElement{
    id:number,
    name:string,
}