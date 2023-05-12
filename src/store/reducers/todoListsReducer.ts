import { v1 } from "uuid";
import { FilterType, TodolistDomainType, TodolistType, } from "../../types";
import { todolistAPI } from "../../api/todolistAPI";
import { Dispatch } from "redux";

export type AddTodoListActionType = ReturnType<typeof addTodoListAC>;
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>;
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>;
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>;
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>;
export type TodoListsActionsType = AddTodoListActionType
    | RemoveTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
    | SetTodoListsActionType
;

const initialState: TodolistDomainType[] = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export const todoListsReducer = (state: TodolistDomainType[] = initialState, action: TodoListsActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOLIST": {
            return action.payload.todolists.map(todo => ({...todo, filter: 'all'}))
        }
        case 'ADD-TODOLIST': {
            const newTodo: TodolistDomainType = {
                id: action.payload.newTodoListId,
                title: action.payload.title,
                addedDate: new Date().getDate().toString(),
                order: 0,
                filter: 'all'
            };
            return [...state, newTodo];
        }
        case "REMOVE-TODOLIST": {
            const copyState = [...state];
            return copyState.filter(todo => todo.id !== action.payload.todoListId);
        }
        case "CHANGE-TODOLIST-TITLE": {
            const copyState = [...state];
            return copyState.map(todo =>
                todo.id === action.payload.todoListId
                ? {...todo, title: action.payload.newTitle}
                : todo);
        }
        case "CHANGE-TODOLIST-FILTER": {
            const copyState = [...state];
            return copyState.map(todo =>
                todo.id === action.payload.todoListId
                ? {...todo, filter: action.payload.filter}
                : todo);
        }
        default:
            return state;
    }
}

export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodoListId: v1(),
            title,
        }
    } as const;
}
export const removeTodoListAC = (todoListId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoListId,
        }
    } as const;
}
export const changeTodoListTitleAC = (todoListId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todoListId,
            newTitle
        }
    } as const;
}
export const changeTodoListFilterAC = (todoListId: string, filter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todoListId,
            filter
        }
    } as const;
}

export const setTodoListsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLIST',
        payload: {
            todolists
        }
    } as const
}

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
            .then(res => {
               dispatch(setTodoListsAC(res.data))
            })
}
