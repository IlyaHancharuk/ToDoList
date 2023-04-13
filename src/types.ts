export type FilterType = 'all' | 'active' | 'completed';

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type TodoListType = {
    id: string;
    title: string;
    filter: FilterType;
}

export type TasksStateType = {
    [todoListId: string]: TasksType[];
}

export type TodoListsStateType = TodoListType[];

