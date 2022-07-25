import React, {FC, useEffect, useMemo, useState} from "react"
import styles from "./combobox.module.scss"

export interface IOption {
    str: string
    value: string | number
}

interface ComboboxProps {
    options: IOption[]
    value: IOption
    setValue: (value: IOption) => void
}

const Combobox: FC<ComboboxProps> = ({options, setValue, value}) => {
    const [isFocused, setFocused] = useState<boolean>(false)
    const [isOpened, setOpened] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>("")

    const filteredOptions = useMemo(() => {
        return options.filter((item) => item.str.toLowerCase().includes(inputValue.toLowerCase()))
    }, [options, inputValue])

    const onFocus = () => {
        setFocused(true)
        setOpened(true)
    }

    const onBlur = () => {
        setFocused(false)
    }

    const btnClickHandler = () => {
        setOpened((prevState) => !prevState)
    }

    const onValueChange = (item: IOption) => {
        setValue(item)
        setInputValue(item.str)
        setOpened(false)
    }

    useEffect(() => {
        setInputValue("")
    }, [value])


    return (
        <div className="relative max-w-xl">
            <div className="shadow-md flex items-stretch rounded-md">
                <input className={`border-2 border-black border-r-0 rounded-r-none rounded-md w-full m-0 py-1 px-2
                outline-none transition-colors ${isFocused && styles.comboFocus}`} type="text" onFocus={onFocus}
                       onBlur={onBlur} value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)}
                       placeholder={value.str}/>
                <button className={`px-1 border-2 border-black border-l-0 rounded-l-none 
                rounded-md transition-colors ${isFocused && styles.comboFocus}`} onClick={btnClickHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5  ${isOpened && "rotate-180"} transition-transform`}
                         viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
            </div>
            <ul className={`absolute top-full left-0 translate-y-1 shadow-md w-full h-36 bg-white rounded-sm 
            opacity-100 ${!isOpened && styles.comboHidden} transition-all overflow-y-scroll md:h-40`}>
                {
                    filteredOptions.length
                        ?
                        filteredOptions.map((item) =>
                            <li key={item.value}
                                className="border-b pl-2 py-1 cursor-pointer hover:bg-blue-100 transition-colors
                                md:pl-3 md:py-2"
                                onClick={() => onValueChange(item)}>{item.str}</li>
                        )
                        :
                        <h6 className="text-center font-bold text-xl">List is empty...</h6>
                }
            </ul>
        </div>
    )
}

export default Combobox