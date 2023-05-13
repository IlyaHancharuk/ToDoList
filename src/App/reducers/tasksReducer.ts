import { TaskType, TasksStateType, UpdateDomainTaskModelType, UpdateTaskModelType } from "../../types";
import { AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType, changeTodolistEntityStatusAC } from "./todoListsReducer";
import { Dispatch } from "redux";
import { todolistAPI } from "../../api/todolistAPI";
import { AppRootStateType } from "../store";
import { setAppErrorAC, setAppStatusAC } from "./appReducer";
import { handleServerAppError, handleServerNetworkError } from "../../utils/errorUtils";
import axios, { AxiosError } from "axios";

export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;
export type SetTasksActionType = ReturnType<typeof setTasksAC>;
export type TasksActionsType = AddTaskActionType
    | RemoveTaskActionType
    | UpdateTaskActionType
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
            action.todolists.forEach(todo => {
                copyState[todo.id] = []
            })
            return copyState;
        }
        case "ADD-TODOLIST": {
            return { ...state, [action.todolist.id]:[] };
        }
        case "REMOVE-TODOLIST": {
            // eslint-disable-next-line no-empty-pattern
            const { [action.todoListId]:[], ...rest } = {...state};
            return rest;
        }
        case "SET-TASKS": {
            return {
                ...state,
                [action.todoListId]:action.tasks
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todoListId]: [action.task, ...state[action.todoListId]]
            };
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .filter(t => t.id !== action.id)
            }
        }
        case "UPDATE-TASK": {
            return {
                ...state, [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.id
                        ? { ...t, ...action.model }
                        : t)
            };
        }
        default:
            return state;
    };
};

export const addTaskAC = (todoListId: string, task: TaskType) => {
    return {
        type: 'ADD-TASK',
        todoListId,
        task
    } as const;
};
export const removeTaskAC = (todoListId: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        todoListId,
        id
    } as const;
};
export const changeTaskTitleAC = (todoListId: string, id: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todoListId,
        id,
        newTitle
    } as const;
};
export const updateTaskAC = (todoListId: string, id: string, model: UpdateDomainTaskModelType) => {
    return {
        type: 'UPDATE-TASK',
        todoListId,
        id,
        model
    } as const;
};
export const setTasksAC = (todoListId: string, tasks: TaskType[]) => {
    return {
        type: "SET-TASKS",
        todoListId,
        tasks
    } as const;
};

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI.getTasks(todolistId)
        .then(res => {
            if (!res.data.error) {
                dispatch(setTasksAC(todolistId, res.data.items));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                if (res.data.error.length) {
                    dispatch(setAppErrorAC(res.data.error))
                } else {
                    dispatch(setAppErrorAC('Some error occurred'))
                }
                dispatch(setAppStatusAC('failed'));
            }
        })
        .catch((e: AxiosError) => {
            handleServerNetworkError(e, dispatch);
        });
};

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((e: AxiosError) => {
            handleServerNetworkError(e, dispatch);
        });
};

export const addTaskTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));
    const res = await todolistAPI.createTask(todolistId, title)
        try {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(todolistId, res.data.data.item));
                dispatch(setAppStatusAC('succeeded'));
                dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'));
            } else {
                handleServerAppError<{ item: TaskType }>(res.data, dispatch);
            }
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                handleServerNetworkError(e, dispatch);
            }
        }
};

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => (
    dispatch: Dispatch,
    getState: () => AppRootStateType
) => {
    dispatch(setAppStatusAC('loading'));
    const task = getState().tasks[todolistId].find(t => t.id === taskId);

    if (task) {
        const model: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        };
        todolistAPI.updateTask(todolistId, taskId, model).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(todolistId, taskId, domainModel));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError<{ item: TaskType }>(res.data, dispatch);
            }
        })
        .catch((e: AxiosError) => {
            handleServerNetworkError(e, dispatch);
        });
    };
};
