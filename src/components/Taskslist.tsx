import React, { FC } from "react";
import { TasksListType } from "../types";

const Taskslist: FC<TasksListType> = (props) => {
    
    const tasksItems: JSX.Element | JSX.Element[] =
        props.tasks.length
        ? props.tasks.map((task) => {

            function removeTask() {
                props.removeTask(task.id);
            }

            return (
                <li key={task.id}>
                    <input type="checkbox" defaultChecked={task.isDone} />
                    <span>{task.title}</span>
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
