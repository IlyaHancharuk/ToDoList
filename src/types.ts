export type PropsToTodoType = {
    title: string;
    tasks: Array<TasksType>;
    removeTask: (id: string) => void;
    changeFilter: (filter: FilterType) => void;
    addTask: (title: string) => void;
}

export type TasksListType = {
    tasks: Array<TasksType>;
    removeTask: (id: string) => void;
}

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';
