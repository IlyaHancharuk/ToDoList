import React, { ChangeEvent, FC } from "react";
import { TasksType } from "../types";

type TaskListPropsType = {
    tasks: TasksType[];
    removeTask: (id: string) => void;
    changeTaskStatus: (id: string, isDone: boolean) => void;
}

const Taskslist: FC<TaskListPropsType> = (props) => {
    const taskItems: JSX.Element[] | JSX.Element =
        props.tasks.length
            ? props.tasks.map(t => {

            const removeTask = () => props.removeTask(t.id);
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked);

            return (
                <li className="task" key={t.id}>
                    <input
                        type="checkbox"
                        defaultChecked={t.isDone}
                        onChange={changeTaskStatus} />
                    <span>{t.title}</span>
                    <button onClick={removeTask}> X </button>
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
