import React, { memo, useCallback } from "react";
import Taskslist from "./Taskslist";
import { FilterType, TasksType } from "../types";
import SuperEditableSpan from "./SupetEditableSpan/SuperEditableSpan";
import AddItemForm from "./AddItemForn";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import { FilterButton } from "./FilterButton";

type PropsToTodoType = {
    todoId: string;
    title: string;
    tasks: TasksType[];
    filter: FilterType;

    addTask: (todoListId: string, title: string) => void;
    removeTask: (todoListId: string, id: string) => void;
    changeTaskStatus: (todoListId: string, id: string, isDone: boolean) => void;
    changeTaskTitle: (todoListId: string, id: string, newTitle: string) => void;

    addTodoList: (title: string) => void;
    changeTodoListFilter: (todoListId: string, filter: FilterType) => void;
    changeTodoListTitle: (todoListId: string, newTitle: string) => void;
    removeTodoList: (todoListId: string) => void;
}

const Todolist: React.FC<PropsToTodoType> = memo((props) => {
    const onAllClickHandler = useCallback(() => props.changeTodoListFilter(props.todoId, "all"), [props.changeTodoListFilter]);
    const onActiveClickHandler = useCallback(() => props.changeTodoListFilter(props.todoId, "active"), [props.changeTodoListFilter]);
    const onCompletedClickHandler = useCallback(() => props.changeTodoListFilter(props.todoId, "completed"), [props.changeTodoListFilter]);

    const addTask = useCallback((title: string) => props.addTask(props.todoId, title), [props.addTask, props.todoId]);
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(props.todoId, title);
    const removeTodoList = () => props.removeTodoList(props.todoId);

    const getFiltredTasks = (tasks: TasksType[], filter: FilterType): TasksType[] => {
        if (filter === 'active') return tasks.filter(t => t.isDone === false);
        if (filter === 'completed') return tasks.filter(t => t.isDone === true);
        return tasks;
    };

    const filtredTasks = getFiltredTasks(props.tasks, props.filter);

    return (
        <div className="Todolist">
            <h3>
                <SuperEditableSpan
                    value={props.title}
                    onChangeText={changeTodoListTitle}
                />
                <IconButton onClick={removeTodoList}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm
                maxLength={15}
                addINewItem={addTask}
            />
            <Taskslist
                todoId={props.todoId}
                tasks={filtredTasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                changeTaskTitle={props.changeTaskTitle}
            />
            <div className="filter-buttons">
                <FilterButton
                        todoId={props.todoId}
                        filter={props.filter}
                        color={props.filter === 'all' ? 'secondary' : 'primary'}
                        innerText="All"
                        changeTodoListFilter={onAllClickHandler}
                />
                <FilterButton
                        todoId={props.todoId}
                        filter={props.filter}
                        color={props.filter === 'active' ? 'secondary' : 'primary'}
                        innerText="Active"
                        changeTodoListFilter={onActiveClickHandler}
                />
                <FilterButton
                        todoId={props.todoId}
                        filter={props.filter}
                        color={props.filter === 'completed' ? 'secondary' : 'primary'}
                        innerText="Complited"
                        changeTodoListFilter={onCompletedClickHandler}
                />
            </div>
        </div>
    )
});

export default Todolist;
