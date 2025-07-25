import {createApi, EndpointBuilder} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth, refTokensApiResponse} from "@/store/api/baseQueryWithReauth";
import {LoginDto} from "@/store/auth/authTypes";
import {IPlaceChangeDto, IPlaceCreateDto, IPlaceElement, IPlaceGetDto} from "@/store/places/places.types";

export const placeAPiSLice = createApi({
    reducerPath: 'placeApi',
    baseQuery:baseQueryWithReauth,
    tagTypes: ['PlaceList'],
    endpoints:(build)=>({
        createPlace:build.mutation<void,IPlaceCreateDto>({
            query:(placeData) =>{
                let bodyFormData = new FormData();
                Object.entries(placeData).filter(([key])=>key!='images').forEach(([key, value]) => {
                    bodyFormData.append(key, value)
                });
                placeData.images?.forEach((img)=>{
                    bodyFormData.append('images',img)
                })
                return {
                    url: '/api/places',
                    body: bodyFormData,
                    method: 'POST',
                }
            },
            invalidatesTags:['PlaceList']
        }),
        changePlace:build.mutation<void,IPlaceChangeDto>({
            query:(placeData) =>{
                let bodyFormData = new FormData();
                Object.entries(placeData).filter(([key])=>key!='images'||'deleteImages').forEach(([key, value]) => {
                    bodyFormData.append(key, value)
                });
                placeData.images?.forEach((img)=>{
                    bodyFormData.append('images',img)
                })
                placeData.deleteImages?.forEach((img)=>{
                    bodyFormData.append('deleteImages',img)
                })
                return {
                    url: '/api/places',
                    body: bodyFormData,
                    method: 'PUT',
                }
            },
            invalidatesTags:['PlaceList']
        }),
        deletePlace:build.mutation<void,number>({
            query:(id) =>{
                return {
                    url: '/api/places',
                    body: {id},
                    method: 'DELETE',
                }
            },
            invalidatesTags:['PlaceList']

        }),
        getPlaceList:build.query<IPlaceElement[],void>({
            query:() =>{
                return {
                    url: '/api/places',
                    method: 'GET',
                }
            },
            providesTags:['PlaceList']
        }),
        getPlaceById:build.query<IPlaceGetDto,number>({
            query:(id) =>{
                return {
                    url: `/api/places/${id}`,
                    method: 'GET',
                }
            },
        }),
    })
})
export const {
    useCreatePlaceMutation,
    useGetPlaceListQuery,
    useGetPlaceByIdQuery,
    useChangePlaceMutation,
    useDeletePlaceMutation
} = placeAPiSLice