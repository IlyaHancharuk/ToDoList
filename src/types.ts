export type PropsToTodoType = {
    title: string;
    tasks: Array<TasksType>;
    activFilter: FilterType;
    removeTask: (id: string) => void;
    changeFilter: (filter: FilterType) => void;
    addTask: (title: string) => void;
    changeTaskStatus: (id: string, status: boolean) => void;
}

export type TasksListType = {
    tasks: Array<TasksType>;
    removeTask: (id: string) => void;
    changeTaskStatus: (id: string, status: boolean) => void;
}

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';
