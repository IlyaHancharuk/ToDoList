import React, { useCallback, useEffect } from 'react';
import { FilterType, TasksStateType, TodolistDomainType } from '../types';
import './App.css';
import Todolist from '../features/Todolist';
import AddItemForm from '../components/AddItemForn';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import { addTaskTC } from './reducers/tasksReducer';
import { addTodolistsTC, changeTodoListFilterAC, getTodolistsTC, removeTodolistsTC, updateTodolistsTitleTC } from './reducers/todoListsReducer';
import { useAppDispatch, useAppSelector } from './store';
import { RequestStatusType } from './reducers/appReducer';

const AppWithRedux = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodolistsTC())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //localState
    const todoLists = useAppSelector<TodolistDomainType[]>(state => state.todolists);
    const tasks = useAppSelector<TasksStateType>(state => state.tasks);
    const status = useAppSelector<RequestStatusType>(state => state.app.status);

    //methods for tasks
    const addTask = useCallback((todoListId: string, title: string) => {
        dispatch(addTaskTC(todoListId, title));
    }, [dispatch]);


    //methods for todolists
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistsTC(title));
    }, [dispatch]);
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodolistsTC(todoListId));
    },[dispatch]);
    const changeTodoListTitle = useCallback((todoListId: string, newTitle: string) => {
        dispatch(updateTodolistsTitleTC(todoListId, newTitle));
    },[dispatch]);
    const changeTodoListFilter = useCallback((todoListId: string, filter: FilterType) => {
        dispatch(changeTodoListFilterAC(todoListId, filter));
    },[dispatch]);

    //UI:
    const todoListComponents: JSX.Element[] | JSX.Element = todoLists.map(todo => (
        <Paper key={todo.id + '-paper'} style={{ height: 'fit-content' }} elevation={5}>
            <Todolist
                todoId={todo.id}
                key={todo.id}
                title={todo.title}
                tasks={tasks[todo.id]}
                filter={todo.filter}

                addTask={addTask}

                addTodoList={addTodoList}
                changeTodoListFilter={changeTodoListFilter}
                changeTodoListTitle={changeTodoListTitle}
                removeTodoList={removeTodoList}
            />
        </Paper>
    ));

    const progressBarStyle = {
        position: 'absolute',
        top: '64px',
        left: '0',
        width: '100%'
    }

    return (
        <div className="App">
            <ResponsiveAppBar />

            {status === 'loading' && <LinearProgress sx={progressBarStyle}/>}

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
};

export default AppWithRedux;
