import React, { ChangeEvent, useState } from "react";
import Taskslist from "./Taskslist";
import { FilterType, TasksType } from "../types";

type PropsToTodoType = {
    todoId: string;
    title: string;
    tasks: TasksType[];
    filter: FilterType;

    addTask: (todoListId: string, title: string) => void;
    removeTask: (todoListId: string, id: string) => void;
    changeTaskStatus: (todoListId: string, id: string, isDone: boolean) => void;

    changeFilter: (todoListId: string, filter: FilterType) => void;
    addTodoList: (title: string) => void;
    removeTodoList: (todoListId: string) => void;
}

const TaskTitleMaxLength = 15;

const Todolist: React.FC<PropsToTodoType> = (props) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [error, setError] = useState(false);

    const handlerToFilterCreator = (filter: FilterType) => () => props.changeFilter(props.todoId, filter);
    const addTask = () => {
        props.addTask(props.todoId, taskTitle);
        setTaskTitle('');
    };
    const changeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value.trimStart();
        text.length > TaskTitleMaxLength ? setError(true) : setError(false);
        setTaskTitle(text);
    };

    const removeTodoList = () => props.removeTodoList(props.todoId);

    const inputClasses = `input ${error && 'error-input'}`;
    const setFilterAllBtnClasses = `${props.filter === 'all' ? 'active-filter-btn' : ''} btn`;
    const setFilterActiveBtnClasses = `${props.filter === 'active' ? 'active-filter-btn' : ''} btn`;
    const setFilterComplitedBtnClasses = `${props.filter === 'completed' ? 'active-filter-btn' : ''} btn`;

    return (
        <div className="Todolist">
            <h3>
                {props.title}
                <button className="btn" onClick={removeTodoList}>X</button>
            </h3>
            <div className="add-task-block">
                <input
                    className={inputClasses}
                    type="text"
                    placeholder="Enter your task title"
                    value={taskTitle}
                    onChange={changeTaskTitle} />
                <button className="btn" onClick={addTask} disabled={taskTitle === '' || error}> + </button>
                {taskTitle.length > TaskTitleMaxLength && <div className="error-message">Task title is to long!</div>}
            </div>
            <Taskslist
                todoId={props.todoId}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus} />
            <div className="filter-buttons">
                <button className={setFilterAllBtnClasses} onClick={handlerToFilterCreator('all')}>All</button>
                <button className={setFilterActiveBtnClasses} onClick={handlerToFilterCreator('active')}>Active</button>
                <button className={setFilterComplitedBtnClasses} onClick={handlerToFilterCreator('completed')}>Complited</button>
            </div>
        </div>
    )
}

export default Todolist;
