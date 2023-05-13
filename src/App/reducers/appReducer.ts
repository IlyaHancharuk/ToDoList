export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AppStateType = typeof initialState;
type ActionsType = AppSetStatusActionType | AppSetErrorActionType;

const initialState = {
    status: 'loading' as RequestStatusType,
    error: 'some error' as null | string
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

export type AppSetStatusActionType = ReturnType<typeof setAppStatusAC>;
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: "APP/SET-STATUS",
        status
    } as const
}

export type AppSetErrorActionType = ReturnType<typeof setAppErrorAC>;
export const setAppErrorAC = (error: null | string) => {
    return {
        type: "APP/SET-ERROR",
        error
    } as const
}
