import { v1 } from "uuid";
import { FilterType, TodoListType } from "../../types";

export type AddTodoListACType = ReturnType<typeof addTodoListAC>;
export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>;
export type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>;
export type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>;
export type TodoListsActionsType =
    AddTodoListACType |
    RemoveTodoListACType |
    ChangeTodoListTitleACType |
    ChangeTodoListFilterACType
;

const initialState: TodoListType[] = [];

export const todoListsReducer = (state: TodoListType[] = initialState, action: TodoListsActionsType): TodoListType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const newTodo: TodoListType = {
                id: action.payload.newTodoListId,
                title: action.payload.title,
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
