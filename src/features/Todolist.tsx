import React, { memo, useCallback, useEffect } from "react";
import Taskslist from "./Taskslist";
import { FilterType, TaskType } from "../types";
import SuperEditableSpan from "../components/SupetEditableSpan/SuperEditableSpan";
import AddItemForm from "../components/AddItemForn";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import { FilterButton } from "../components/FilterButton";
import { useAppDispatch } from "../App/store";
import { getTasksTC } from "../App/reducers/tasksReducer";

type PropsToTodoType = {
    todoId: string;
    title: string;
    tasks: TaskType[];
    filter: FilterType;

    addTask: (todoListId: string, title: string) => void;

    addTodoList: (title: string) => void;
    changeTodoListFilter: (todoListId: string, filter: FilterType) => void;
    changeTodoListTitle: (todoListId: string, newTitle: string) => void;
    removeTodoList: (todoListId: string) => void;
}

const Todolist: React.FC<PropsToTodoType> = memo(({
    todoId,
    title,
    tasks,
    filter,

    addTask,

    changeTodoListFilter,
    changeTodoListTitle,
    removeTodoList
}
) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTasksTC(todoId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onAllClickHandler = useCallback(() => {
        changeTodoListFilter(todoId, "all");
    }, [changeTodoListFilter, todoId]);

    const onActiveClickHandler = useCallback(() => {
        changeTodoListFilter(todoId, "active");
    }, [changeTodoListFilter, todoId]);

    const onCompletedClickHandler = useCallback(() => {
        changeTodoListFilter(todoId, "completed");
    }, [changeTodoListFilter, todoId]);

    const addTaskHandler = useCallback((title: string) => {
        addTask(todoId, title);
    }, [addTask, todoId]);

    const changeTodoListTitleHandler = useCallback((title: string) => {
        changeTodoListTitle(todoId, title);
    }, [changeTodoListTitle, todoId]);

    const removeTodoListHandler = () => removeTodoList(todoId);

    const filtredTasks = ((tasks: TaskType[], filter: FilterType): TaskType[] => {
        if (filter === 'active') return tasks.filter(t => t.completed === false);
        if (filter === 'completed') return tasks.filter(t => t.completed === true);
        return tasks;
    })(tasks, filter);

    return (
        <div className="Todolist">
            <h3>
                <SuperEditableSpan
                    value={title}
                    onChangeText={changeTodoListTitleHandler}
                />
                <IconButton onClick={removeTodoListHandler}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm
                maxLength={15}
                addINewItem={addTaskHandler}
            />
            <Taskslist
                todoId={todoId}
                tasks={filtredTasks}
            />
            <div className="filter-buttons">
                <FilterButton
                        todoId={todoId}
                        color={filter === 'all' ? 'secondary' : 'primary'}
                        innerText="All"
                        changeTodoListFilter={onAllClickHandler}
                />
                <FilterButton
                        todoId={todoId}
                        color={filter === 'active' ? 'secondary' : 'primary'}
                        innerText="Active"
                        changeTodoListFilter={onActiveClickHandler}
                />
                <FilterButton
                        todoId={todoId}
                        color={filter === 'completed' ? 'secondary' : 'primary'}
                        innerText="Complited"
                        changeTodoListFilter={onCompletedClickHandler}
                />
            </div>
        </div>
    )
});

export default Todolist;
