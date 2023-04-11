import React, { ChangeEvent, useState } from "react";
import Taskslist from "./Taskslist";
import { FilterType, TasksType } from "../types";

type PropsToTodoType = {
    title: string;
    tasks: TasksType[];
    changeFilter: (filter: FilterType) => void;
    removeTask: (id: string) => void;
    changeTaskStatus: (id: string, isDone: boolean) => void;
    addTask: (title: string) => void;
    filter: FilterType;
}

const TaskTitleMaxLength = 15;

const Todolist: React.FC<PropsToTodoType> = (props) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [error, setError] = useState(false);

    const setAllFilter = () => props.filter !== 'all' && props.changeFilter('all');
    const setActiveFilter = () => props.filter !== 'active' && props.changeFilter('active');
    const setComplitedFilter = () => props.filter !== 'completed' && props.changeFilter('completed');

    const addTask = () => {
        props.addTask(taskTitle);
        setTaskTitle('');
    };
    const changeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value.trimStart();
        text.length > TaskTitleMaxLength ? setError(true) : setError(false);
        setTaskTitle(text);
    };

    return (
        <div className="Todolist">
            <h3>{props.title}</h3>
            <div className="add-task-block">
                <input
                    type="text"
                    value={taskTitle}
                    onChange={changeTaskTitle} />
                <button onClick={addTask} disabled={taskTitle === '' || error}> + </button>
            </div>
            {taskTitle.length > TaskTitleMaxLength && <div className="error-message">Task title is to long!</div>}
            <Taskslist
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus} />
            <div className="filter-buttons">
                <button className={props.filter === 'all' ? 'active-filter-btn' : ''} onClick={setAllFilter}>All</button>
                <button className={props.filter === 'active' ? 'active-filter-btn' : ''} onClick={setActiveFilter}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter-btn' : ''} onClick={setComplitedFilter}>Complited</button>
            </div>
        </div>
    )
}

export default Todolist;
