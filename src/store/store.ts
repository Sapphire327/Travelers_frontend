import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authSlice from "@/store/auth/authSlice";
import {authApiSlice} from "@/store/auth/authApiSlice";
import {placeAPiSLice} from "@/store/places/placesApiSlice";
import {toursAPiSLice} from "@/store/tours/toursApiSlice";
import {applicationsApiSlice} from "@/store/applications/applicationsApiSlice";

const rootReducer  = combineReducers({
    authReducer:authSlice,
    [authApiSlice.reducerPath]:authApiSlice.reducer,
    [placeAPiSLice.reducerPath]:placeAPiSLice.reducer,
    [toursAPiSLice.reducerPath]:toursAPiSLice.reducer,
    [applicationsApiSlice.reducerPath]:applicationsApiSlice.reducer,
})
export const makeStore = () => {
    return configureStore({
        reducer:rootReducer,
        middleware:(getDefaultMiddleware) =>
            getDefaultMiddleware().concat([
                authApiSlice.middleware,
                placeAPiSLice.middleware,
                toursAPiSLice.middleware,
                applicationsApiSlice.middleware
            ])
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']