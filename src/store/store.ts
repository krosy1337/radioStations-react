import {configureStore} from "@reduxjs/toolkit"
import radioReducer from "store/radio/radioSlice"
import {radioApi} from "store/radio/radioApi"

export const store = configureStore({
    reducer: {
        radio: radioReducer,
        [radioApi.reducerPath]: radioApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(radioApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch