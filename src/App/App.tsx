import React, { useCallback, useEffect } from 'react';
import { FilterType, RequestStatusType, TasksStateType, TodolistDomainType } from '../types';
import './App.css';
import Todolist from '../features/Todolist';
import AddItemForm from '../components/AddItemForn';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import { addTodolistsTC, changeTodoListFilterAC, getTodolistsTC, removeTodolistsTC, updateTodolistsTitleTC } from './reducers/todoListsReducer';
import { useAppDispatch, useAppSelector } from './store';
import { ErrorSnackbar } from '../components/ErrorSnackbar';
import { addTaskTC } from './reducers/tasksReducer';

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodolistsTC())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const todoLists = useAppSelector<TodolistDomainType[]>(state => state.todolists);
    const tasks = useAppSelector<TasksStateType>(state => state.tasks);
    const status = useAppSelector<RequestStatusType>(state => state.app.status);

    const addTask = useCallback((todoListId: string, title: string) => {
        dispatch(addTaskTC(todoListId, title));
    }, [dispatch]);

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

    const todoListComponents: JSX.Element[] | JSX.Element = todoLists.map(todo => (
        <Paper key={todo.id + '-paper'} style={{ height: 'fit-content' }} elevation={5}>
            <Todolist
                todoId={todo.id}
                key={todo.id}
                title={todo.title}
                tasks={tasks[todo.id]}
                filter={todo.filter}
                entityStatus={todo.entityStatus}

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

            {status === 'loading' && <LinearProgress  sx={progressBarStyle}/>}
            {status === 'failed' && <LinearProgress color='error' sx={progressBarStyle}/>}

            <main className='main'>
                <div className='addTodoForm-container'>
                    <AddItemForm disabled={status === 'loading'}
                                 maxLength={15}
                                 addINewItem={addTodoList}
                    />
                </div>
                <div className='todoLists-container'>
                    {todoListComponents}
                </div>
                <ErrorSnackbar />
            </main>
        </div>
    );
};

export default App;
