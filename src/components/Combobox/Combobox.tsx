import React, {FC} from "react"
import Select, {SingleValue, StylesConfig} from "react-select"

export interface IOption {
    label: string
    value: string | number
}

interface ComboboxProps {
    options: IOption[]
    value: IOption
    isLoading: boolean
    onChange: (value: SingleValue<IOption>) => void
}

const customStyles: StylesConfig<IOption, false> = {
    menuList: (base) => ({
        ...base,
        height: "14rem",
    })
}

const Combobox: FC<ComboboxProps> = ({options, onChange, value, isLoading}) => {
    return (
        <div className="relative max-w-xl">
            <Select options={options} value={value} onChange={onChange} styles={customStyles} isLoading={isLoading} />
        </div>
    )
}

export default Combobox