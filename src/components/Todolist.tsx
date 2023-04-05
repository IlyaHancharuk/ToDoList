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

    function addTask() {
        const trimTitle = title.trim();
        trimTitle && props.addTask(title);
        setTitle('');
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value);
    }

    function onKeyDownHandler(e: KeyboardEvent) {
        (e.key === 'Enter') && addTask();
    }

    function setAllFilterValue() {
        props.changeFilter('all');
    }

    function setActiveFilterValue() {
        props.changeFilter('active');
    }

    function setCompletedFilterValue() {
        props.changeFilter('completed');
    }

    return (
        <div className="Todolist">
            <h3>{props.title}</h3>
            <div>
                {/* <input ref={addTaskInput}/>
                <button onClick={addTask}>+</button> */}
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    />
                <button disabled={title.length === 0} onClick={addTask}>+</button>
                { title.length > 20 && <div style={{color: 'hotpink'}}>Task title is to long!</div> }
            </div>
            <Taskslist tasks={props.tasks} removeTask={props.removeTask} />
            <div>
                <button onClick={setAllFilterValue}>All</button>
                <button onClick={setActiveFilterValue}>Active</button>
                <button onClick={setCompletedFilterValue}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;
