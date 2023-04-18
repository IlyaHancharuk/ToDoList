import React, { ChangeEvent, FC } from "react";
import { TasksType } from "../types";
import SuperEditableSpan from "./SupetEditableSpan/SuperEditableSpan";
import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type TaskListPropsType = {
    todoId: string;
    tasks: TasksType[];
    removeTask: (todoListId: string, id: string) => void;
    changeTaskStatus: (todoListId: string, id: string, isDone: boolean) => void;
    changeTaskTitle: (todoListId: string, id: string, newTitle: string) => void;
}

const Taskslist: FC<TaskListPropsType> = (props) => {
    const taskItems: JSX.Element[] | JSX.Element =
        props.tasks.length
            ? props.tasks.map(t => {
                const removeTask = () => props.removeTask(props.todoId, t.id);
                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(props.todoId, t.id, e.currentTarget.checked)
                };
                const changeTaskTitle = (title: string) => {
                    props.changeTaskTitle(props.todoId, t.id, title);
                }

                const taskClasses = `task ${t.isDone ? 'task-done' : ''}`;

                return (
                    <li className={taskClasses} key={t.id}>
                        <Checkbox
                            defaultChecked={t.isDone}
                            onChange={changeTaskStatus}/>
                        <SuperEditableSpan
                            value={t.title}
                            onChangeText={changeTaskTitle} />
                        <IconButton onClick={removeTask}>
                            <DeleteIcon />
                        </IconButton>
                    </li>
                )
            })
            : <span className="error-message">You tasklist is empty!</span>

    return (
        <ul className="tasklist">
            {taskItems}
        </ul>
    )
}

export default Taskslist;
