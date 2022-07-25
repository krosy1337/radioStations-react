import {useSelector, TypedUseSelectorHook, useDispatch} from "react-redux"
import {AppDispatch, RootState} from "store/store"
import {radioSlice} from "store/radio/radioSlice"
import {bindActionCreators} from "@reduxjs/toolkit"

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const actions = {
    ...radioSlice.actions,
}

export const useActions = () => {
    const dispatch: AppDispatch = useDispatch()

    return bindActionCreators(actions, dispatch)
}