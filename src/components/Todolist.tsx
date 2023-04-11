import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { PropsToTodoType } from "../types";
import Taskslist from "./Taskslist";

const Todolist: React.FC<PropsToTodoType> = (props) => {

    /* const addTaskInput: RefObject<HTMLInputElement> = useRef(null);

    function addTask() {
        if(addTaskInput.current) {
            props.addTask(addTaskInput.current.value);
            addTaskInput.current.value = '';
        }
    } */

    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);

    function addTask() {
        const trimTitle = title.trim();
        trimTitle ? props.addTask(title) : setError(true);
        setTitle('');
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value.trimStart());
        error && setError(false);
    }

    function onKeyDownHandler(e: KeyboardEvent) {
        (e.key === 'Enter') && addTask();
    }

    const setAllFilterValue = () => props.changeFilter('all');
    const setActiveFilterValue = () => props.changeFilter('active');
    const setCompletedFilterValue = () => props.changeFilter('completed');


    return (
        <div className="Todolist">
            <h3>{props.title}</h3>
            <div>
                {/* <input ref={addTaskInput}/>
                <button onClick={addTask}>+</button> */}
                <input
                    value={title}
                    placeholder="Please, enter title"
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler} />
                <button disabled={title.length === 0} onClick={addTask}> + </button>
                { title.length > 20 && <div style={{color: 'hotpink'}}>Task title is to long!</div> }
            </div>
            <Taskslist
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus} />
            <div>
                <button
                    className={props.activFilter === 'all' ? 'active-filter-btn' : 'filter-btn'}
                    onClick={setAllFilterValue}>All</button>
                <button
                    className={props.activFilter === 'active' ? 'active-filter-btn' : 'filter-btn'}
                    onClick={setActiveFilterValue}>Active</button>
                <button
                    className={props.activFilter === 'completed' ? 'active-filter-btn' : 'filter-btn'}
                    onClick={setCompletedFilterValue}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;
