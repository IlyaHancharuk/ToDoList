import React, { ChangeEvent, FC, memo, useCallback } from 'react';
import SuperEditableSpan from "./SupetEditableSpan/SuperEditableSpan";
import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { TasksType } from '../types';

type TaskPropsType = {
    todoId: string;
    task: TasksType;
    removeTask: (todoListId: string, id: string) => void;
    changeTaskStatus: (todoListId: string, id: string, isDone: boolean) => void;
    changeTaskTitle: (todoListId: string, id: string, newTitle: string) => void;
}

export const Task: FC<TaskPropsType> = memo(({
    todoId,
    task,
    removeTask,
    changeTaskStatus,
    changeTaskTitle
}) => {
    const removeTaskHandler = () => removeTask(todoId, task.id);
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todoId, task.id, e.currentTarget.checked);
    };
    const changeTaskTitleHandler = useCallback((title: string) => {
        changeTaskTitle(todoId, task.id, title);
    }, [changeTaskTitle, todoId, task]);

    const taskClasses = `task ${task.isDone ? 'task-done' : ''}`;

    return (
        <li className={taskClasses}>
            <Checkbox
                checked={task.isDone}
                onChange={changeTaskStatusHandler} />
            <SuperEditableSpan
                value={task.title}
                onChangeText={changeTaskTitleHandler} />
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon />
            </IconButton>
        </li>
    )
});
