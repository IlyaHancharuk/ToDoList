import { v1 } from "uuid";
import { TasksStateType } from "../types";

export const TaskReducer = (state: TasksStateType, action: AllActionsType): TasksStateType => {
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
        default:
            return state;
    }
}

type AllActionsType =
    AddTaskACType |
    RemoveTaskACType |
    ChangeTaskTitleACType |
    ChangeTaskStatusACType
;

type AddTaskACType = ReturnType<typeof addTaskAC>;
export const addTaskAC = (todoListId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoListId,
            title,
        }
    } as const;
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export const removeTaskAC = (todoListId: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoListId,
            id,
        }
    } as const;
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;
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

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
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
