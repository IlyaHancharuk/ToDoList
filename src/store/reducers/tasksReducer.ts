import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses, TaskType, TasksStateType } from "../../types";
import { AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType } from "./todoListsReducer";

export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type TasksActionsType = AddTaskActionType
    | RemoveTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsActionType
;

const initialState: TasksStateType = {
    // "todolistId1": [
    //     { id: "1", title: "CSS",completed: false, status: TaskStatuses.New, todoListId: "todolistId1", description: '',
    //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
    //     { id: "2", title: "JS",completed: false, status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
    //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
    //     { id: "3", title: "React",completed: false, status: TaskStatuses.New, todoListId: "todolistId1", description: '',
    //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    // ],
    // "todolistId2": [
    //     { id: "1", title: "bread",completed: false, status: TaskStatuses.New, todoListId: "todolistId2", description: '',
    //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
    //     { id: "2", title: "milk",completed: false, status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
    //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
    //     { id: "3", title: "tea",completed: false, status: TaskStatuses.New, todoListId: "todolistId2", description: '',
    //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    // ]

}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TODOLIST": {
            const copyState = { ...state };
            action.payload.todolists.forEach(todo => {
                copyState[todo.id] = []
            })
            return copyState;
        }
        case "ADD-TODOLIST": {
            return { ...state, [action.payload.newTodoListId]:[] };
        }
        case "REMOVE-TODOLIST": {
            // eslint-disable-next-line no-empty-pattern
            const { [action.payload.todoListId]:[], ...rest } = {...state};
            return rest;
        }
        case 'ADD-TASK': {
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.title,
                status: TaskStatuses.New,
                todoListId: action.payload.todoListId,
                description: '', startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.Low,
                completed: false
            };
            const updatedTasks = [newTask, ...state[action.payload.todoListId]];
            return { ...state, [action.payload.todoListId]: updatedTasks };
        }
        case "REMOVE-TASK": {
            const updatedTasks = state[action.payload.todoListId]
                .filter(t => t.id !== action.payload.id);
            return { ...state, [action.payload.todoListId]: updatedTasks }
        }
        case "CHANGE-TASK-TITLE": {
            const updatedTasks = state[action.payload.todoListId]
                .map(t => t.id === action.payload.id
                    ? {...t, title: action.payload.newTitle}
                    : t);
            return { ...state, [action.payload.todoListId]: updatedTasks };
        }
        case "CHANGE-TASK-STATUS": {
            const updatedTasks = state[action.payload.todoListId]
                .map(t => t.id === action.payload.id
                    ? {...t, completed: action.payload.newStatus}
                    : t);
            return { ...state, [action.payload.todoListId]: updatedTasks };
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
