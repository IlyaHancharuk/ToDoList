import React, { ChangeEvent, FC } from "react";
import { TasksType } from "../types";

type TaskListPropsType = {
    todoId: string;
    tasks: TasksType[];
    removeTask: (todoListId: string, id: string) => void;
    changeTaskStatus: (todoListId: string, id: string, isDone: boolean) => void;
}

const Taskslist: FC<TaskListPropsType> = (props) => {
    const taskItems: JSX.Element[] | JSX.Element =
        props.tasks.length
            ? props.tasks.map(t => {
            const removeTask = () => props.removeTask(props.todoId, t.id);
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(props.todoId, t.id, e.currentTarget.checked)
            };

            const taskClasses = `task ${t.isDone ? 'task-done' : ''}`;

            return (
                <li className={taskClasses} key={t.id}>
                    <input
                        type="checkbox"
                        defaultChecked={t.isDone}
                        onChange={changeTaskStatus} />
                    <span>{t.title}</span>
                    <button className="btn" onClick={removeTask}> X </button>
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
