export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AppStateType = typeof initialState;
type ActionsType = AppSetStatusActionType;

const initialState = {
    status: 'loading' as RequestStatusType
}

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return { ...state, status: action.status };
        }
        default:
            return state;
    }
}

export type AppSetStatusActionType = ReturnType<typeof appSetStatusAC>;
export const appSetStatusAC = (status: RequestStatusType) => {
    return {
        type: "APP/SET-STATUS",
        status
    } as const
}