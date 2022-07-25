import React, {FC, useEffect, useState} from "react"
import Combobox, {IOption} from "./Combobox/Combobox"
import {useActions, useAppSelector} from "hooks/redux"
import {IStation} from "models/radio"


const StationsList: FC<{stations: IStation[]}> = ({stations}) => {
    const {station} = useAppSelector(state => state.radio)
    const {setStation} = useActions()
    const [value, setValue] = useState<IOption>({} as IOption)

    const arr: IOption[] = stations.map((s) => ({
        str: s.name,
        value: s.stationuuid
    }))

    useEffect(() => {
        const station = stations.find((s) => s.stationuuid === value.value)
        if (station) {
            setStation(station)
        }
    }, [value])

    useEffect(() => {
        if (station) {
            setValue({
                str: station.name,
                value: station.stationuuid,
            })
        }
    }, [station])

    return (
        <>
            <div className="text-base mb-1">Station: </div>
            <Combobox options={arr} value={value} setValue={setValue} />
        </>
    )
}

export default StationsList