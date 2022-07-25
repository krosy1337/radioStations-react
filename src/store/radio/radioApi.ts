import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import {ICountry, IStation} from "models/radio"

export const radioApi = createApi({
    reducerPath: "radio/api",
    baseQuery: fetchBaseQuery({baseUrl: "https://de1.api.radio-browser.info/json/"}),
    endpoints: (build) => ({
        getStationsByCountry: build.query<IStation[], {country: string, limit?: number}>({
            query: ({country, limit=20}) => ({
                url: `stations/bycountry/${country}`,
                params: {
                    limit
                }
            })
        }),
        getCountries: build.query<ICountry[], void>({
            query: () => ({
                url: "countries",
            })
        }),
    }),
})

export const {useGetStationsByCountryQuery, useLazyGetStationsByCountryQuery,
    useGetCountriesQuery,} = radioApi