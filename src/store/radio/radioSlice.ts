import {ICountry, IRadio, IStation} from "models/radio"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

const initialState: IRadio = {
    station: null,
    country: null,
}

export const radioSlice = createSlice({
    name: "radio",
    initialState,
    reducers: {
        setStation: (state, action: PayloadAction<IStation | null>) => {
            state.station = action.payload
        },
        setCountry: (state, action: PayloadAction<ICountry>) => {
            state.country = action.payload
        },
    },
})

export default radioSlice.reducer