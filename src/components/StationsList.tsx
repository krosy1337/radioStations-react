import React, {FC, useEffect, useState} from "react"
import Combobox, {IOption} from "./Combobox/Combobox"
import {useActions, useAppSelector} from "hooks/redux"
import {IStation} from "models/radio"
import {SingleValue} from "react-select"


const StationsList: FC<{stations: IStation[], isLoading: boolean}> = ({stations, isLoading}) => {
    const {station} = useAppSelector(state => state.radio)
    const {setStation} = useActions()
    const [value, setValue] = useState<IOption>({} as IOption)

    const arr: IOption[] = stations.map((s) => ({
        label: s.name,
        value: s.stationuuid
    }))

    const onChange = (newValue: SingleValue<IOption>) => {
        if (newValue) {
            const newStation = stations.find((s: IStation) => s.stationuuid === newValue.value)
            if (newStation) {
                setStation(newStation)
            }
        }
    }

    useEffect(() => {
        if (station) {
            setValue({
                label: station.name,
                value: station.stationuuid,
            })
        }
    }, [station])

    return (
        <>
            <div className="text-base mb-1">Station: </div>
            <Combobox options={arr} value={value} onChange={onChange} isLoading={isLoading} />
        </>
    )
}

export default StationsList