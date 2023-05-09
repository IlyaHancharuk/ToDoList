import { v1 } from "uuid";
import { TasksStateType } from "../types";
import { AddTodoListACType, RemoveTodoListACType } from "./todoListsReducer";

export type AddTaskACType = ReturnType<typeof addTaskAC>;
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
export type TasksActionsType =
    AddTaskACType |
    RemoveTaskACType |
    ChangeTaskTitleACType |
    ChangeTaskStatusACType |
    AddTodoListACType |
    RemoveTodoListACType
;

export const tasksReducer = (state: TasksStateType, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            const updatedTasks = [newTask, ...state[action.payload.todoListId]];
            return { ...state, [action.payload.todoListId]: updatedTasks };
        }
        case "REMOVE-TASK": {
            const updatedTasks = state[action.payload.todoListId].filter(t => t.id !== action.payload.id);
            return { ...state, [action.payload.todoListId]: updatedTasks }
        }
        case "CHANGE-TASK-TITLE": {
            const updatedTasks = state[action.payload.todoListId].map(t => t.id === action.payload.id ? {...t, title: action.payload.newTitle} : t);
            return { ...state, [action.payload.todoListId]: updatedTasks };
        }
        case "CHANGE-TASK-STATUS": {
            const updatedTasks = state[action.payload.todoListId].map(t => t.id === action.payload.id ? {...t, isDone: action.payload.newStatus} : t);
            return { ...state, [action.payload.todoListId]: updatedTasks };
        }
        case "ADD-TODOLIST": {
            return { ...state, [action.payload.newTodoListId]:[] };
        }
        case "REMOVE-TODOLIST": {
            // eslint-disable-next-line no-empty-pattern
            const { [action.payload.todoListId]:[], ...rest } = {...state};
            return rest;
        }
        default:
            return state;
    }
}

export const addTaskAC = (todoListId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoListId,
            title,
        }
    } as const;
}
export const removeTaskAC = (todoListId: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoListId,
            id,
        }
    } as const;
}
export const changeTaskTitleAC = (todoListId: string, id: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todoListId,
            id,
            newTitle,
        }
    } as const;
}
export const changeTaskStatusAC = (todoListId: string, id: string, newStatus: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoListId,
            id,
            newStatus,
        }
    } as const;
}
