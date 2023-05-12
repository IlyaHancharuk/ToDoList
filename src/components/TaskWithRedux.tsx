import React, { ChangeEvent, FC, memo, useCallback } from 'react';
import SuperEditableSpan from "./SupetEditableSpan/SuperEditableSpan";
import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskType } from '../types';
import { changeTaskStatusAC, changeTaskTitleAC, deleteTasksTC } from '../store/reducers/tasksReducer';
import { useAppDispatch } from '../store/store';

type TaskPropsType = {
    todoId: string;
    task: TaskType;
}

export const TaskWithRedux: FC<TaskPropsType> = memo(({
    todoId,
    task
}) => {
    const dispatch = useAppDispatch();

    const removeTask = useCallback(() => {
        dispatch(deleteTasksTC(todoId, task.id));
    }, [dispatch, todoId, task.id]);

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(todoId, task.id, e.currentTarget.checked));
    }, [dispatch, todoId, task.id]);

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(todoId, task.id, title));
    }, [dispatch, todoId, task.id]);

    const taskClasses = `task ${task.completed ? 'task-done' : ''}`;

    return (
        <li className={taskClasses}>
            <Checkbox
                checked={task.completed}
                onChange={changeTaskStatus} />
            <SuperEditableSpan
                value={task.title}
                onChangeText={changeTaskTitle} />
            <IconButton onClick={removeTask}>
                <DeleteIcon />
            </IconButton>
        </li>
    );
});
