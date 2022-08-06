import React, {FC, useEffect, useState} from "react"
import {useActions, useAppSelector} from "hooks/redux"
import Combobox, {IOption} from "components/Combobox/Combobox"
import {ICountry} from "models/radio"
import {SingleValue} from "react-select"

const CountryList: FC<{countries: ICountry[], isLoading: boolean}> = ({countries, isLoading}) => {
    const {country} = useAppSelector(state => state.radio)
    const {setCountry} = useActions()
    const [value, setValue] = useState<IOption>({} as IOption)

    const arr: IOption[] = countries.map((c) => ({
        label: c.name,
        value: c.iso_3166_1
    }))

    const onChange = (newValue: SingleValue<IOption>) => {
        if (newValue) {
            const newCountry = countries.find((c: ICountry) => c.iso_3166_1 === newValue.value)
            if (newCountry) {
                setCountry(newCountry)
            }
        }
    }

    useEffect(() => {
        if (country) {
            setValue({
                label: country.name,
                value: country.iso_3166_1,
            })
        }
    }, [country])
    return (
        <>
            <div className="text-base mb-1">Country: </div>
            <Combobox options={arr} value={value} onChange={onChange} isLoading={isLoading}/>
        </>
    )
}

export default CountryList