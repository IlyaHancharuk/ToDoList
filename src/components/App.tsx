import React, { useState } from 'react';
import { FilterType, TasksStateType, TasksType, TodoListType, TodoListsStateType } from '../types';
import './App.css';
import Todolist from './Todolist';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForn';
import ResponsiveAppBar from './ResponsiveAppBar';
import { Paper } from '@mui/material';

const App = () => {

    //BLL:
    const todoListId_1 = v1();
    const todoListId_2 = v1();

        //localState
    const [todoLists, setTodoLists] = useState<TodoListsStateType>([
        {id: todoListId_1, title: 'What to lern', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            { id: v1(), title: 'HTML', isDone: true, },
            { id: v1(), title: 'CSS', isDone: true, },
            { id: v1(), title: 'JS', isDone: true, },
            { id: v1(), title: 'React', isDone: false, },
            { id: v1(), title: 'Rest API', isDone: false, },
            { id: v1(), title: 'GraphQL', isDone: false, },
        ],
        [todoListId_2]: [
            { id: v1(), title: 'Milk', isDone: false, },
            { id: v1(), title: 'Meat', isDone: false, },
            { id: v1(), title: 'Pepsi', isDone: false, },
            { id: v1(), title: 'Cheese', isDone: false, },
        ],
    })

    //methods for filter
    const getFiltredTasks = (tasks: TasksType[], filter: FilterType): TasksType[] => {
        if (filter === 'active') return tasks.filter(t => t.isDone === false);
        if (filter === 'completed') return tasks.filter(t => t.isDone === true);
        return tasks;
    }
    const changeTodoListFilter = (todoListId: string, filter: FilterType) => {
        const updatedTodoList = todoLists.map(todo => todo.id === todoListId ? {...todo, filter: filter} : todo);
        setTodoLists(updatedTodoList);
    };

    //methods for tasks
    const removeTask = (todoListId: string, id: string) => {
        const updatedTasks = tasks[todoListId].filter(t => t.id !== id);
        setTasks({...tasks, [todoListId]: updatedTasks});
    };
    const changeTaskStatus = (todoListId: string, id: string, status: boolean) => {
        const updatedTasks = tasks[todoListId].map(t => t.id === id ? {...t, isDone: status} : t);
        setTasks({...tasks, [todoListId]: updatedTasks});
    }
    const changeTaskTitle = (todoListId: string, id: string, newTitle: string) => {
        const updatedTasks = tasks[todoListId].map(t => t.id === id ? {...t, title: newTitle} : t);
        setTasks({...tasks, [todoListId]: updatedTasks});
    }
    const addTask = (todoListId: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false};
        const updatedTasks = [newTask, ...tasks[todoListId],];
        setTasks({...tasks, [todoListId]: updatedTasks});
    }

    //methods for todolists
    const addTodoList = (title: string) => {
        const newTodoId = v1();
        const newTodo: TodoListType = {id: newTodoId, title, filter: 'all'};
        setTodoLists([...todoLists, newTodo]);
        setTasks({...tasks, [newTodoId]: []});
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(todo => todo.id !== todoListId));
        delete tasks[todoListId];
    }
    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        const updatedTodoLists = todoLists.map(todo => todo.id === todoListId ? {...todo, title: newTitle} : todo);
        setTodoLists(updatedTodoLists);
    }

    //UI:
    const todoListComponents: JSX.Element[] | JSX.Element = todoLists.map(todo => {
        const filtredTasks = getFiltredTasks(tasks[todo.id], todo.filter);


        return (
            <Paper style={{height: 'fit-content'}} elevation={5}>
                <Todolist
                    todoId={todo.id}
                    key={todo.id}
                    title={todo.title}
                    tasks={filtredTasks}
                    filter={todo.filter}

                    addTask={addTask}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}

                    addTodoList={addTodoList}
                    changeTodoListFilter={changeTodoListFilter}
                    changeTodoListTitle={changeTodoListTitle}
                    removeTodoList={removeTodoList}
                />
            </Paper>
        )
        
        
    })

    return (
        <div className="App">
            <ResponsiveAppBar />
            <main className='main'>
                <div className='addTodoForm-container'>
                    <AddItemForm maxLength={15} addINewItem={addTodoList} />
                </div>
                <div className='todoLists-container'>
                    {todoListComponents}
                </div>
            </main>
        </div>
    );
}

export default App;
