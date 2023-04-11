import React, { FC } from "react";
import { TasksListType } from "../types";

const Taskslist: FC<TasksListType> = (props) => {
    
    const tasksItems: JSX.Element | JSX.Element[] =
        props.tasks.length
        ? props.tasks.map((task) => {

            const taskClassName = task.isDone ? 'task-done' : 'task';
            const removeTask = () => props.removeTask(task.id);
            const changeTaskStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(task.id, e.currentTarget.checked);
            };

            return (
                <li key={task.id}>
                    <input
                        type="checkbox"
                        defaultChecked={task.isDone}
                        onChange={changeTaskStatus} />
                    <span className={taskClassName}>{task.title}</span>
                    <button onClick={removeTask}> X </button>
                </li>
            )
        })
        : <span>Your tasklist is empty</span>;

    return (
        <ul>
            {tasksItems}
        </ul>
    )
}

export default Taskslist;
