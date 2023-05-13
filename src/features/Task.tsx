import React, { ChangeEvent, FC, memo, useCallback } from 'react';
import SuperEditableSpan from "../components/SupetEditableSpan/SuperEditableSpan";
import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskStatuses, TaskType } from '../types';
import { removeTaskTC, updateTaskTC } from '../App/reducers/tasksReducer';
import { useAppDispatch } from '../App/store';

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
        dispatch(updateTaskTC(todoId, task.id, { status }));
    }, [dispatch, todoId, task.id]);

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(updateTaskTC(todoId, task.id, { title }));
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
