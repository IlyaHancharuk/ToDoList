
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { TodoListsActionsType, todoListsReducer } from './reducers/todoListsReducer';
import { TasksActionsType, tasksReducer } from './reducers/tasksReducer';
import thunk from 'redux-thunk';
import { ThunkDispatch } from "redux-thunk/es/types";
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { appReducer } from './reducers/appReducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type ReduxStoreType = typeof store;
export type AllActionsType = TasksActionsType | TodoListsActionsType;
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

// кастомный хук для того, чтобы не типизировать хук useDispatch при каждом использовании
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store;

