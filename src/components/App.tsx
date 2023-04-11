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

    const [filter, setFilter] = useState<FilterType>('all');

    const getFiltredTasks = (tasks: TasksType[]) => {
        if (filter === 'active') return tasks.filter(t => t.isDone === false);
        if (filter === 'completed') return tasks.filter(t => t.isDone === true);
        return tasks;
    }

    const changeFilter = (filter: FilterType) => setFilter(filter);
    const removeTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));
    const changeTaskStatus = (id: string, status: boolean) => {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone: status} : t));
    }
    const addTask = (title: string) => {
        setTasks([...tasks, {id: v1(), title: title, isDone: false}]);
    }

    //UI:
    return (
        <div className="App">
            <Todolist
                title='What to lern'
                tasks={getFiltredTasks(tasks)}
                changeFilter={changeFilter}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                addTask={addTask}
                filter={filter} />
        </div>
    );
}

export default App;
