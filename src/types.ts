export type FilterType = 'all' | 'active' | 'completed';

export type TasksStateType = {
    [todoListId: string]: TaskType[];
}

export type TodoListsStateType = TodolistType[];

export type TaskType = {
    description: string;
    title: string;
    completed: boolean;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
}

export type TodolistType = {
    id: string;
    addedDate: string;
    order: number;
    title: string;
}

export type TodolistDomainType = TodolistType & {
    filter: FilterType;
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}

export type UpdateTaskModelType = {
    title: string;
    description: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
}

export type UpdateDomainTaskModelType = {
    title?: string;
    description?: string;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string;
    deadline?: string;
}
