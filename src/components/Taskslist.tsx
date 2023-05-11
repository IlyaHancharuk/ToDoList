import React, { FC } from "react";
import { TasksType } from "../types";
import { Task } from "./Task";

type TaskListPropsType = {
    todoId: string;
    tasks: TasksType[];
    removeTask: (todoListId: string, id: string) => void;
    changeTaskStatus: (todoListId: string, id: string, isDone: boolean) => void;
    changeTaskTitle: (todoListId: string, id: string, newTitle: string) => void;
}

const Taskslist: FC<TaskListPropsType> = ({
    todoId,
    tasks,
    removeTask,
    changeTaskStatus,
    changeTaskTitle
}) => {
    const taskItems: JSX.Element[] | JSX.Element =
        tasks.length
            ? tasks.map(t => (
                <Task key={t.id}
                      task={t}
                      todoId={todoId}
                      removeTask={removeTask}
                      changeTaskStatus={changeTaskStatus}
                      changeTaskTitle={changeTaskTitle}
                />
            ))
            : <span className="error-message">You tasklist is empty!</span>;

    return (
        <ul className="tasklist">
            {taskItems}
        </ul>
    );
}

export default Taskslist;
