import { FilterType, TodoListType } from "../types";

export const todoListReducer = (state: TodoListType[], action: AllActionsType): TodoListType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const newTodo: TodoListType = {id: action.payload.newTodoListId, title: action.payload.title, filter: 'all'};
            return [...state, newTodo];
        }
        case "REMOVE-TODOLIST": {
            const updatedTodoLists = state.filter(todo => todo.id !== action.payload.todoListId);
            return updatedTodoLists;
        }
        case "CHANGE-TODOLIST-TITLE": {
            const updatedTodoLists = state.map(todo => todo.id === action.payload.todoListId ? {...todo, title: action.payload.newTitle} : todo);
            return updatedTodoLists;
        }
        case "CHANGE-TODOLIST-FILTER": {
            const updatedTodoLists = state.map(todo => todo.id === action.payload.todoListId ? {...todo, filter: action.payload.filter} : todo);
            return updatedTodoLists;
        }
        default:
            return state;
    }
}

type AllActionsType =
    AddTodoListACType |
    RemoveTodoListACType |
    ChangeTodoListTitleACType |
    ChangeTodoListFilterACType
;

type AddTodoListACType = ReturnType<typeof addTodoListAC>;
export const addTodoListAC = (newTodoListId: string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodoListId,
            title,
        }
    } as const;
}

type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>;
export const removeTodoListAC = (todoListId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoListId,
        }
    } as const;
}

type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>;
export const changeTodoListTitleAC = (todoListId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todoListId,
            newTitle
        }
    } as const;
}

type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>;
export const changeTodoListFilterAC = (todoListId: string, filter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todoListId,
            filter
        }
    } as const;
}
