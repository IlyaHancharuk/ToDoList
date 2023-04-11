import React, { useState } from 'react';
import { FilterType, TasksType } from '../types';
import './App.css';
import Todolist from './Todolist';
import { v1 } from 'uuid';

const App = () => {
    //BLL:
        //localState
    const [tasks, setTasks] = useState( [
        { id: v1(), title: 'HTML', isDone: true, },
        { id: v1(), title: 'CSS', isDone: true, },
        { id: v1(), title: 'JS', isDone: true, },
        { id: v1(), title: 'React', isDone: false, },
        { id: v1(), title: 'Rest API', isDone: false, },
        { id: v1(), title: 'GraphQL', isDone: false, },
    ]);

    const removeTask = (id: string) => {
       const filtredTasks =  tasks.filter(task => task.id !== id);
       setTasks(filtredTasks);
    }

    const addTask = (title: string) => {
        const newTask: TasksType = { id: v1(), title: title, isDone: false,};
        setTasks([newTask, ...tasks]);
    }

    const changeTaskStatus = (id: string, status: boolean) => {
       const changedTasks = tasks.map(t => t.id === id ? {...t, isDone: status} : t);
       setTasks(changedTasks);
    }

    let [filter, setFilter] = useState<FilterType>('all');

    let filtredTasks: TasksType[] = tasks;

    if(filter === 'active') {
        filtredTasks = filtredTasks.filter(task => task.isDone === false);
    }

    if(filter === 'completed') {
        filtredTasks = filtredTasks.filter(task => task.isDone === true);
    }

    const changeFilter = (filter: FilterType) => setFilter(filter);

    //UI:
    return (
        <div className="App">
            <Todolist
            title="What to lern"
            tasks={filtredTasks}
            activFilter={filter}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus} />
        </div>
    );
}

export default App;
