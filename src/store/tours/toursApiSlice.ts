import {BaseQueryMeta, createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth} from "@/store/api/baseQueryWithReauth";
import {
    ITourUpdateDto,
    ITourCreateDto,
    ITourElement,
    ITourGetDto,
    ITourPublic,
    ITourPublicById
} from "@/store/tours/tours.types";

export const toursAPiSLice = createApi({
    reducerPath: 'tourApi',
    baseQuery:baseQueryWithReauth,
    tagTypes: ['TourList'],
    endpoints:(build)=>({
        createTour:build.mutation<void,ITourCreateDto>({
            query:(tourData) =>{
                return {
                    url: '/api/tours',
                    body: tourData,
                    method: 'POST',
                }
            },
            invalidatesTags:['TourList']
        }),
        changeTour:build.mutation<void,ITourUpdateDto>({
            query:(tourData) =>{
                return {
                    url: '/api/tours',
                    body: tourData,
                    method: 'PUT',
                }
            },
            invalidatesTags:['TourList']
        }),
        deleteTour:build.mutation<void,number>({
            query:(id) =>{
                return {
                    url: '/api/tours',
                    body: {id},
                    method: 'DELETE',
                }
            },
            invalidatesTags:['TourList']
        }),
        getTourList:build.query<ITourElement[],void>({
            query:() =>{
                return {
                    url: '/api/tours',
                    method: 'GET',
                }
            },
            providesTags:['TourList']
        }),
        getTourById:build.query<ITourGetDto,number>({
            query:(id) =>{
                return {
                    url: `/api/tours/${id}`,
                    method: 'GET',
                }
            },
        }),
        getPublicTourById:build.query<ITourPublicById,number>({
            query:(id) =>{
                return {
                    url: `/api/tours/public/${id}`,
                    method: 'GET',
                }
            },
        }),
        getPublicTour:build.query<ITourPublic[],void>({
            query:() =>{
                return {
                    url: `/api/tours/public`,
                    method: 'GET',
                }
            },
        }),

    })
})
export const {
    useCreateTourMutation,
    useGetTourListQuery,
    useGetTourByIdQuery,
    useChangeTourMutation,
    useDeleteTourMutation,
    useGetPublicTourQuery,
    useGetPublicTourByIdQuery
} = toursAPiSLice