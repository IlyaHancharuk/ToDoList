import React, { ChangeEvent, FC, memo, useCallback } from 'react';
import SuperEditableSpan from "./SupetEditableSpan/SuperEditableSpan";
import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskStatuses, TaskType } from '../types';
import { removeTaskTC, updateTaskStatusTC, updateTaskTitleTC } from '../store/reducers/tasksReducer';
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
        dispatch(removeTaskTC(todoId, task.id));
    }, [dispatch, todoId, task.id]);

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const status: TaskStatuses = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.InProgress;
        dispatch(updateTaskStatusTC(todoId, task.id, status));
    }, [dispatch, todoId, task.id]);

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(updateTaskTitleTC(todoId, task.id, title));
    }, [dispatch, todoId, task.id]);

    const CheckboxStatus = task.status === TaskStatuses.Completed ? true : false;
    const taskClasses = `task ${CheckboxStatus ? 'task-done' : ''}`;

    return (
        <li className={taskClasses}>
            <Checkbox
                checked={CheckboxStatus}
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
