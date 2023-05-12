import { TaskStatuses, TaskType, TasksStateType } from "../../types";
import { AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType } from "./todoListsReducer";
import { Dispatch } from "redux";
import { todolistAPI } from "../../api/todolistAPI";
import { AppRootStateType } from "../store";

export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type SetTasksActionType = ReturnType<typeof setTasksAC>;
export type TasksActionsType = AddTaskActionType
    | RemoveTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsActionType
    | SetTasksActionType
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
            return { ...state, [action.payload.todolist.id]:[] };
        }
        case "REMOVE-TODOLIST": {
            // eslint-disable-next-line no-empty-pattern
            const { [action.payload.todoListId]:[], ...rest } = {...state};
            return rest;
        }
        case "SET-TASKS": {
            return {
                ...state,
                [action.payload.todoListId]:action.payload.tasks
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.todoListId]: [action.payload.task, ...state[action.payload.todoListId]]
            };
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId]
                    .filter(t => t.id !== action.payload.id)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(t => t.id === action.payload.id
                        ? {...t, title: action.payload.newTitle}
                        : t)
            };
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(t => t.id === action.payload.id
                        ? { ...t, status: action.payload.newStatus }
                        : t)
            };
        }
        default:
            return state;
    }
}

export const addTaskAC = (todoListId: string, task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoListId,
            task,
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
export const changeTaskStatusAC = (todoListId: string, id: string, newStatus: TaskStatuses) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoListId,
            id,
            newStatus,
        }
    } as const;
}

export const setTasksAC = (todoListId: string, tasks: TaskType[]) => {
    return {
        type: "SET-TASKS",
        payload: {
            todoListId,
            tasks
        }
    } as const;
}

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items));
        });
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId));
        });
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(todolistId, res.data.data.item));
        });
}

export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) => (
    dispatch: Dispatch,
    getState: () => AppRootStateType
) => {
    const task = getState().tasks[todolistId].find(t => t.id === taskId);

    if (task) {
        todolistAPI.updateTask(todolistId, taskId, {
            title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }).then(res => {
            dispatch(changeTaskTitleAC(todolistId, taskId, title));
        });
    }
}

export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => (
    dispatch: Dispatch,
    getState: () => AppRootStateType
) => {
    const task = getState().tasks[todolistId].find(t => t.id === taskId);

    if (task) {
        todolistAPI.updateTask(todolistId,taskId, {
            title: task.title,
            description: task.description,
            status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }).then(res => {
                dispatch(changeTaskStatusAC(todolistId, taskId, status));
            });
    }
}
