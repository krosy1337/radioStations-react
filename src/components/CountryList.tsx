import React, {FC, useEffect, useState} from "react"
import {useActions, useAppSelector} from "hooks/redux"
import Combobox, {IOption} from "components/Combobox/Combobox"
import {ICountry} from "models/radio"

const CountryList: FC<{countries: ICountry[]}> = ({countries}) => {
    const {country} = useAppSelector(state => state.radio)
    const {setCountry} = useActions()
    const [value, setValue] = useState<IOption>({} as IOption)

    const arr: IOption[] = countries.map((c) => ({
        str: c.name,
        value: c.iso_3166_1
    }))

    useEffect(() => {
        const country = countries.find((c) => c.iso_3166_1 === value.value)
        if (country) {
            setCountry(country)
        }
    }, [value])

    useEffect(() => {
        if (country) {
            setValue({
                str: country.name,
                value: country.iso_3166_1,
            })
        }
    }, [country])
    return (
        <>
            <div className="text-base mb-1">Country: </div>
            <Combobox options={arr} value={value} setValue={setValue}/>
        </>
    )
}

export default CountryList