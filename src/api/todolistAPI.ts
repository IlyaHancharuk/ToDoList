import axios, { AxiosResponse } from "axios";
import { TaskType, TodolistType, UpdateTaskModelType } from "../types";

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

type TasksResponseType = {
    items: TaskType[];
    totalCount: number
    error: string | null
}
export type ResponseType<DataType = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: DataType
}
 
export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>(`todo-lists`);
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(`todo-lists`, { title });
    },
    
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`);
    },
    
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, { title });
    },
    
    getTasks(todolistId: string, page = 1, count = 10) {
        return instance
            .get<TasksResponseType>(`/todo-lists/${todolistId}/tasks?page=${page}&count=${count}`);
    },
    
    createTask(todolistId: string, title: string) {
        return instance
            .post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, { title });
    },
    
    deleteTask(todolistId: string, taskId: string) {
        return instance
            .delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
    },
    
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance
            .put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(
                `/todo-lists/${todolistId}/tasks/${taskId}`,
                 model
            );
    },
}
