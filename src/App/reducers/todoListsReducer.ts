import { FilterType, RequestStatusType, TodolistDomainType, TodolistType, } from "../../types";
import { todolistAPI } from "../../api/todolistAPI";
import { Dispatch } from "redux";
import { setAppStatusAC } from "./appReducer";

export type AddTodoListActionType = ReturnType<typeof addTodoListAC>;
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>;
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>;
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>;
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>;
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>;
export type TodoListsActionsType = AddTodoListActionType
    | RemoveTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
    | SetTodoListsActionType
    | ChangeTodolistEntityStatusActionType
;

const initialState: TodolistDomainType[] = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export const todoListsReducer = (
    state: TodolistDomainType[] = initialState,
    action: TodoListsActionsType
): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOLIST": {
            return action.todolists
                .map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}));
        }
        case 'ADD-TODOLIST': {
            return [
                {...action.todolist, filter: 'all', entityStatus: 'idle'},
                ...state
            ];
        }
        case "REMOVE-TODOLIST": {
            return state.filter(todo => todo.id !== action.todoListId);
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(todo =>
                todo.id === action.todoListId
                ? {...todo, title: action.newTitle}
                : todo);
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(todo =>
                todo.id === action.todoListId
                ? {...todo, filter: action.filter}
                : todo);
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return state.map(todo =>
                todo.id === action.todoListId
                ? {...todo, entityStatus: action.entityStatus}
                : todo);
        }
        default:
            return state;
    }
}

export const addTodoListAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        todolist
    } as const;
}
export const removeTodoListAC = (todoListId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListId,
    } as const;
}
export const changeTodoListTitleAC = (todoListId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todoListId,
        newTitle
    } as const;
}
export const changeTodoListFilterAC = (todoListId: string, filter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todoListId,
        filter
    } as const;
}
export const setTodoListsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLIST',
        todolists
    } as const
}
export const changeTodolistEntityStatusAC = (todoListId: string, entityStatus: RequestStatusType) => {
    return {
        type: 'CHANGE-TODOLIST-ENTITY-STATUS',
        todoListId,
        entityStatus
    } as const
}

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI.getTodolists()
            .then(res => {
               dispatch(setTodoListsAC(res.data));
               dispatch(setAppStatusAC('succeeded'));
            })
}

export const addTodolistsTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI.createTodolist(title)
            .then(res => {
               dispatch(addTodoListAC(res.data.data.item));
               dispatch(setAppStatusAC('succeeded'));
            })
}

export const removeTodolistsTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTodolistEntityStatusAC(todoListId, 'loading'));
    todolistAPI.deleteTodolist(todoListId)
            .then(res => {
               dispatch(removeTodoListAC(todoListId));
               dispatch(setAppStatusAC('succeeded'));
            })
}
export const updateTodolistsTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI.updateTodolistTitle(todoListId, title)
            .then(res => {
               dispatch(changeTodoListTitleAC(todoListId, title));
               dispatch(setAppStatusAC('succeeded'));
            })
}
