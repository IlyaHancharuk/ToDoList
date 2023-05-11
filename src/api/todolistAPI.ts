import axios from "axios";

const baseURL = 'https://social-network.samuraijs.com/api/1.1/';
const API_KEY = 'c44c7483-d218-46e7-8fde-cd68d45f3f47';

// @ts-ignore
const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'API-KEY': API_KEY
    }
});

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type TasksResponseType = {
    items: TaskType[];
    totalCount: number
    error: string
}

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<DataType> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: DataType
}
 

export const getTodolists = () => {
    return instance.get<TodolistType[]>(`todo-lists`);
}

export const createTodolist = (title: string) => {
    return instance.post<ResponseType<{item: TodolistType}>>(`todo-lists`, { title });
}

export const deleteTodolist = (todolistId: string) => {
    return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`);
}

export const updateTodolistTitle = (todolistId: string, title: string) => {
    return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, { title });
}

export const getTasks = (todolistId: string, page = 1, count = 10) => {
    return instance.get<TasksResponseType>(`/todo-lists/${todolistId}/tasks?page=${page}&count=${count}`);
}

export const createTask = (todolistId: string, title: string) => {
    return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, { title });
}

export const deleteTask = (todolistId: string, taskId: string) => {
    return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`);
}

export const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
    return instance.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, { title });
}
