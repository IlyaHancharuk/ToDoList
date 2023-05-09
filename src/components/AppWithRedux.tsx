import React from 'react';
import { FilterType, TasksStateType, TasksType, TodoListType } from '../types';
import './App.css';
import Todolist from './Todolist';
import AddItemForm from './AddItemForn';
import ResponsiveAppBar from './ResponsiveAppBar';
import { Paper } from '@mui/material';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../store/reducers/tasksReducer';
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC } from '../store/reducers/todoListsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../store/store';

const AppWithRedux = () => {
    //localState
    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    //methods for filter
    const getFiltredTasks = (tasks: TasksType[], filter: FilterType): TasksType[] => {
        if (filter === 'active') return tasks.filter(t => t.isDone === false);
        if (filter === 'completed') return tasks.filter(t => t.isDone === true);
        return tasks;
    }

    //methods for tasks
    const addTask = (todoListId: string, title: string) => {
        dispatch(addTaskAC(todoListId, title));
    }
    const removeTask = (todoListId: string, id: string) => {
        dispatch(removeTaskAC(todoListId, id));
    }
    const changeTaskTitle = (todoListId: string, id: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todoListId, id, newTitle));
    }
    const changeTaskStatus = (todoListId: string, id: string, status: boolean) => {
        dispatch(changeTaskStatusAC(todoListId, id, status))
    }

    //methods for todolists
    const addTodoList = (title: string) => {
        dispatch(addTodoListAC(title));
    }
    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodoListAC(todoListId));
    }
    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        dispatch(changeTodoListTitleAC(todoListId, newTitle));
    }
    const changeTodoListFilter = (todoListId: string, filter: FilterType) => {
        dispatch(changeTodoListFilterAC(todoListId, filter));
    };


    //UI:
    const todoListComponents: JSX.Element[] | JSX.Element = todoLists.map(todo => {
        const filtredTasks = getFiltredTasks(tasks[todo.id], todo.filter);

        return (
            <Paper key={todo.id + '-paper'} style={{height: 'fit-content'}} elevation={5}>
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
    });

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

export default AppWithRedux;
