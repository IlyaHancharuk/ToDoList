import React, { FC } from "react";
import { TasksType } from "../types";
import { TaskWithRedux } from "./TaskWithRedux";

type TaskListPropsType = {
    todoId: string;
    tasks: TasksType[];
}

const Taskslist: FC<TaskListPropsType> = ({
    todoId,
    tasks,
}) => {
    const taskItems: JSX.Element[] | JSX.Element =
        tasks.length
            ? tasks.map(t => (
                <TaskWithRedux key={t.id}
                               task={t}
                               todoId={todoId}
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
