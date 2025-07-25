import {BaseQueryMeta, createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth} from "@/store/api/baseQueryWithReauth";
import {
    Application,
    IApplicationCreateDto, IApplicationPatchDto,
} from "@/store/applications/applications.types";
import {toursAPiSLice} from "@/store/tours/toursApiSlice";

export const applicationsApiSlice = createApi({
    reducerPath: 'applicationApi',
    baseQuery:baseQueryWithReauth,
    tagTypes: ['ApplicationList'],
    endpoints:(build)=>({
        createApplication:build.mutation<void,IApplicationCreateDto>({
            query:(applicationData) =>{
                return {
                    url: '/api/applications',
                    body: applicationData,
                    method: 'POST',
                }
            },
            invalidatesTags:['ApplicationList']
        }),
        commitApplication:build.mutation<void,IApplicationPatchDto>({
            query:(applicationData) =>{
                return {
                    url: '/api/applications',
                    body: applicationData,
                    method: 'PATCH',
                }
            },
            onQueryStarted: (arg, api) => {
                api.queryFulfilled.then(() => {
                    api.dispatch(
                        toursAPiSLice.util.invalidateTags(["TourList"])
                    );
                });
            },
            invalidatesTags:['ApplicationList']
        }),
        deleteApplication:build.mutation<void,number>({
            query:(id) =>{
                return {
                    url: '/api/applications',
                    body: {id},
                    method: 'DELETE',
                }
            },
            onQueryStarted: (arg, api) => {
                api.queryFulfilled.then(() => {
                    api.dispatch(
                        toursAPiSLice.util.invalidateTags(["TourList"])
                    );
                });
            },
            invalidatesTags:['ApplicationList']
        }),
        getApplicationConsideringList:build.query<Application[],void>({
            query:() =>{
                return {
                    url: '/api/applications/considering',
                    method: 'GET',
                }
            },
            providesTags:['ApplicationList']
        }),
        getApplicationListByTourId:build.query<Application[],number|null>({
            query:(tourId) =>{
                return {
                    url: '/api/applications/byTourId',
                    params:{tourId},
                    method: 'GET',
                }
            },
            providesTags:['ApplicationList']
        }),
    })
})
export const {
    useCreateApplicationMutation,
    useGetApplicationConsideringListQuery,
    useGetApplicationListByTourIdQuery,
    useDeleteApplicationMutation,
    useCommitApplicationMutation
} = applicationsApiSlice