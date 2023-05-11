import React, { useCallback } from 'react';
import { FilterType, TasksStateType, TodoListType } from '../types';
import './App.css';
import Todolist from './Todolist';
import AddItemForm from './AddItemForn';
import ResponsiveAppBar from './ResponsiveAppBar';
import { Paper } from '@mui/material';
import { addTaskAC } from '../store/reducers/tasksReducer';
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC } from '../store/reducers/todoListsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../store/store';
import { CreateTask, CreateTodolist, DeleteTask, DeleteTodolist, GetTasks, GetTodolists, UpdateTaskTitle, UpdateTodolistTitle } from '../api/testComponent';

const AppWithRedux = () => {
    //localState
    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    //methods for tasks
    const addTask = useCallback((todoListId: string, title: string) => {
        dispatch(addTaskAC(todoListId, title));
    }, [dispatch]);


    //methods for todolists
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title));
    }, [dispatch]);
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListAC(todoListId));
    },[dispatch]);
    const changeTodoListTitle = useCallback((todoListId: string, newTitle: string) => {
        dispatch(changeTodoListTitleAC(todoListId, newTitle));
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
                <div>Todolists</div>
                {/* <GetTodolists /> */}
                <div>Todo Actions</div>
                {/* <CreateTodolist /> */}
                {/* <DeleteTodolist /> */}
                {/* <UpdateTodolistTitle /> */}
                <div>Tasks</div>
                {/* <GetTasks /> */}
                <div>Task Actions</div>
                {/* <CreateTask /> */}
                {/* <DeleteTask /> */}
                {/* <UpdateTaskTitle /> */}
            </main>
        </div>
    );
};

export default AppWithRedux;
