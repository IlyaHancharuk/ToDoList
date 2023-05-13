import { RequestStatusType } from "../../types";

export type AppStateType = typeof initialState;
type ActionsType = SetAppErrorActionType | SetAppStatusActionType;

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return { ...state, status: action.status };
        }
        case 'APP/SET-ERROR': {
            return { ...state, error: action.error };
        }
        default:
            return state;
    }
}

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: "APP/SET-STATUS",
        status
    } as const
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export const setAppErrorAC = (error: null | string) => {
    return {
        type: "APP/SET-ERROR",
        error
    } as const
}
