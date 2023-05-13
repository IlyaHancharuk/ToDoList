import { Dispatch } from "redux";
import { SetAppErrorActionType, SetAppStatusActionType, setAppErrorAC, setAppStatusAC } from "../App/reducers/appReducer";
import { ResponseType } from "./../api/todolistAPI";

type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>;

export const handleServerNetworkError = (error: Error, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}
